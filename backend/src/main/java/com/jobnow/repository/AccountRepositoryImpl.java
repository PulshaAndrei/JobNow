package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Account;
import com.jobnow.entity.ConfirmationCode;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import io.jsonwebtoken.JwtBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * Created by Andrei on 11.12.2016.
 */

@Repository("accountRepository")

public class AccountRepositoryImpl implements AccountRepository<Account> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Value("${smsServer.username}")
    private String smsServerUsername;

    @Value("${smsServer.password}")
    private String smsServerPassword;

    @Value("${token.key}")
    private String tokenKey;

    @Override
    public String login(String phone, String password) throws ExpectedException {
        Account serverAccount = getAccountByPhone(phone);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (serverAccount == null || !encoder.matches(password, serverAccount.getPassword())) {
            throw new ExpectedException("Неверный номер телефона или пароль.", HttpStatus.UNAUTHORIZED);
        }

        return getToken(serverAccount);
    }

    @Override
    public void phoneConfirmation(String phone) throws ExpectedException {
        if (!phone.matches("375\\d{9}$")) {
            throw new ExpectedException("Неправильный номер телефона. Пожалуйтса, введите телефон в формате +375 (ХХ) ХХХ ХХХХ.", HttpStatus.BAD_REQUEST);
        }

        String baseURL = "https://api.rocketsms.by/simple/send?username=" + smsServerUsername + "&password=" + smsServerPassword;

        Random rNo = new Random();
        final int code = rNo.nextInt((99999 - 10000) + 1) + 10000;

        String text = "JobNow:+" + code + "+-+ваш+код+для+регистрации.";
        System.out.println(text);

        HttpResponse<JsonNode> response = null;
        try {
            response = Unirest.post(baseURL + "&phone=" + phone + "&text=" + text + "&priority=true")
                    .header("Accept", "application/json")
                    .asJson();
        } catch (UnirestException e) {
            throw new ExpectedException("SMS сервис не отправил сообщение. Пожалуйста, попробуйте еще раз через некоторое время.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            response.getBody().getObject().get("error");
            throw new ExpectedException("Ощибка при отправке СМС: " + response.getBody().getObject().get("error"), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MINUTE, 1);
            jdbcOperations.update("INSERT INTO phone_confirmations (phone, code, expiration_date, activated) VALUES (?, ?, ?, ?) " +
                            "ON CONFLICT (phone) DO UPDATE SET code = EXCLUDED.code, expiration_date = EXCLUDED.expiration_date, activated = EXCLUDED.activated;",
                    phone, code, calendar.getTimeInMillis(), false);
        }
    }

    public void activateConfirmationCode(ConfirmationCode confirmationCode) throws ExpectedException {
        try {
            ConfirmationCode serverConfirmationCode = (ConfirmationCode) jdbcOperations.queryForObject("SELECT * FROM phone_confirmations WHERE phone = ?",
                    new Object[]{confirmationCode.getPhone()}, new BeanPropertyRowMapper(ConfirmationCode.class));

            if (!serverConfirmationCode.getCode().equalsIgnoreCase(confirmationCode.getCode())) {
                throw new ExpectedException("Неверный смс-код.", HttpStatus.BAD_REQUEST);
            }

            Calendar calendar = Calendar.getInstance();
            if (serverConfirmationCode.getExpirationDate() < calendar.getTimeInMillis()) {
                throw new ExpectedException("Срок действия смс-кода истек.", HttpStatus.BAD_REQUEST);
            }

            jdbcOperations.update("UPDATE phone_confirmations SET activated = true WHERE phone = ?;",
                    confirmationCode.getPhone());
        }
        catch (EmptyResultDataAccessException e) {
            throw new ExpectedException("Такого номера телефона не существует.", HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    public Account get(long id) throws ExpectedException {
        try {
            return (Account) jdbcOperations.queryForObject("SELECT id, given_name, family_name, phone, email, communication_method, basic_info, image_url, rate, review_count FROM accounts WHERE id = ?",
                    new Object[]{id}, new BeanPropertyRowMapper(Account.class));
        }
        catch (EmptyResultDataAccessException e) {
            throw new ExpectedException("Аккаунт не существует.", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public String create(Account account) throws ExpectedException {
        if (account.getGivenName() == "" || account.getFamilyName() == "" || account.getPhone() == "" || account.getPassword() == "" || account.getConfirmationCode() == "") {
            throw new ExpectedException("Поля имя, фамилия и пароль не могут быть пустыми.", HttpStatus.BAD_REQUEST);
        }

        //TODO check password secure

        if (getAccountByPhone(account.getPhone()) != null) {
            throw new ExpectedException("Такой номер телефона ужу зарегистрирован.", HttpStatus.BAD_REQUEST);
        }

        ConfirmationCode serverConfirmationCode;

        try {
            serverConfirmationCode = (ConfirmationCode) jdbcOperations.queryForObject("SELECT * FROM phone_confirmations WHERE phone = ?",
                    new Object[]{account.getPhone()}, new BeanPropertyRowMapper(ConfirmationCode.class));
        }
        catch (EmptyResultDataAccessException e) {
            throw new ExpectedException("This phone hasn't been approved.", HttpStatus.BAD_REQUEST);
        }

        if (!serverConfirmationCode.getCode().equalsIgnoreCase(account.getConfirmationCode())) {
            throw new ExpectedException("Wrong confirmation code.", HttpStatus.BAD_REQUEST);
        }

        if (!serverConfirmationCode.isActivated()) {
            throw new ExpectedException("Confirmation code hasn't been activated.", HttpStatus.BAD_REQUEST);
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(account.getPassword());
        jdbcOperations.update("INSERT INTO accounts (password, given_name, family_name, phone, email, communication_method, basic_info, image_url, rate, review_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                hashedPassword, account.getGivenName(), account.getFamilyName(), account.getPhone(), account.getEmail(), account.getCommunicationMethod(), account.getBasicInfo(), account.getImageUrl(), 0, 0);
        return login(account.getPhone(), account.getPassword());
    }

    @Override
    public Account update(Account account) throws ExpectedException {
        if (account.getGivenName() == "" || account.getFamilyName() == "" || account.getPhone() == "") {
            throw new ExpectedException("Поля имя, фамилия и номер телефона не могут быть пустыми.", HttpStatus.BAD_REQUEST);
        }

        jdbcOperations.update("UPDATE accounts SET given_name = ?, family_name = ?, email = ?, communication_method = ?, basic_info = ?, image_url = ? WHERE id = ?;",
                account.getGivenName(), account.getFamilyName(), account.getEmail(), account.getCommunicationMethod(), account.getBasicInfo(), account.getImageUrl(), account.getId());

        return get(account.getId());
    }

    @Override
    public void delete(long id) throws ExpectedException {
        jdbcOperations.update("DELETE FROM accounts WHERE id = ?", new Object[]{id}, new BeanPropertyRowMapper(Account.class));
    }

    public Account getAccountByPhone(String phone) {
        try {
            return (Account) jdbcOperations.queryForObject("SELECT * FROM accounts WHERE phone = ?", new Object[]{phone}, new BeanPropertyRowMapper(Account.class));
        }
        catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public String getToken(Account account) {
        Map<String, Object> tokenData = new HashMap<>();
        tokenData.put("userID", account.getId());
        tokenData.put("phone", account.getPhone());
        tokenData.put("token_create_date", new Date().getTime());
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, 1);
        tokenData.put("token_expiration_date", calendar.getTime());
        JwtBuilder jwtBuilder = Jwts.builder();
        jwtBuilder.setExpiration(calendar.getTime());
        jwtBuilder.setClaims(tokenData);
        String token = jwtBuilder.signWith(SignatureAlgorithm.HS512, tokenKey).compact();
        return token;
    }

}