package com.jobnow.repository;

import com.jobnow.entity.Account;
import com.jobnow.entity.ConfirmationCode;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import io.jsonwebtoken.JwtBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Repository;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

/**
 * Created by Andrei on 11.12.2016.
 */

@Repository("accountRepository")

public class AccountRepositoryImpl implements AccountRepository<Account> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    Properties properties;

    public AccountRepositoryImpl() throws IOException {
        properties = new Properties();
        properties.load(new FileInputStream("src/main/resources/config.properties"));
    }

    @Override
    public String login(String phone, String password) throws Exception {
        Account serverAccount = getAccountByPhone(phone);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (serverAccount == null || !encoder.matches(password, serverAccount.getPassword())) {
            throw new Exception("Incorrect phone or password.", new Throwable("userDataWrong"));
        }

        return getToken(serverAccount);
    }

    @Override
    public void phoneConfirmation(String phone) throws Exception {
        if (!phone.matches("375\\d{9}$")) {
            throw new Exception("Phone number is invalid or not from Belarus", new Throwable("userDataWrong"));
        }

        String baseURL = "https://api.rocketsms.by/simple/send?username=" + properties.getProperty("smsServer.username") + "&password=" + properties.getProperty("smsServer.password");

        Random rNo = new Random();
        final int code = rNo.nextInt((99999 - 10000) + 1) + 10000;

        String text = "Your+code+JobNow:+" + code;

        HttpResponse<JsonNode> response = Unirest.post(baseURL + "&phone=" + phone + "&text=" + text + "&priority=true")
                .header("Accept", "application/json")
                .asJson();

        if (response.getBody().getObject().get("error") != null) {
            //TODO: uncomment in production
            //throw new Exception("Send SMS failed: " + response.getBody().getObject().get("error"), new Throwable("userDataWrong"));
        }

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 1);
        jdbcOperations.update("INSERT INTO phone_confirmations (phone, code, expiration_date, activated) VALUES (?, ?, ?, ?) " +
                        "ON CONFLICT (phone) DO UPDATE SET code = EXCLUDED.code, expiration_date = EXCLUDED.expiration_date, activated = EXCLUDED.activated;",
                phone, code, calendar.getTimeInMillis(), false);

    }

    public void activateConfirmationCode(ConfirmationCode confirmationCode) throws Exception {
        try {
            ConfirmationCode serverConfirmationCode = (ConfirmationCode) jdbcOperations.queryForObject("SELECT * FROM phone_confirmations WHERE phone = ?",
                    new Object[]{confirmationCode.getPhone()}, new BeanPropertyRowMapper(ConfirmationCode.class));

            if (!serverConfirmationCode.getCode().equalsIgnoreCase(confirmationCode.getCode())) {
                throw new Exception("Wrong confirmation code.", new Throwable("userDataWrong"));
            }

            Calendar calendar = Calendar.getInstance();
            if (serverConfirmationCode.getExpirationDate() < calendar.getTimeInMillis()) {
                throw new Exception("Confirmation code expired date error.", new Throwable("userDataWrong"));
            }

            jdbcOperations.update("UPDATE phone_confirmations SET activated = true WHERE phone = ?;",
                    confirmationCode.getPhone());
        }
        catch (EmptyResultDataAccessException e) {
            throw new Exception("This phone number doesn't exist.", new Throwable("userDataWrong"));
        }

    }

    @Override
    public Account get(long id) throws Exception {
        try {
            return (Account) jdbcOperations.queryForObject("SELECT id, given_name, family_name, phone, email, communication_method, basic_info, image_url FROM accounts WHERE id = ?",
                    new Object[]{id}, new BeanPropertyRowMapper(Account.class));
        }
        catch (EmptyResultDataAccessException e) {
            throw new Exception("This account doesn't exist.", new Throwable("userDataWrong"));
        }
    }

    @Override
    public String create(Account account) throws Exception {
        if (account.getGivenName() == "" || account.getFamilyName() == "" || account.getPhone() == "" || account.getPassword() == "" || account.getConfirmationCode() == "") {
            throw new Exception("Fields given name, family name and phone can't be empty.", new Throwable("userDataWrong"));
        }

        //TODO check password secure

        if (getAccountByPhone(account.getPhone()) != null) {
            throw new Exception("This phone already exist.", new Throwable("userDataWrong"));
        }

        ConfirmationCode serverConfirmationCode;

        try {
            serverConfirmationCode = (ConfirmationCode) jdbcOperations.queryForObject("SELECT * FROM phone_confirmations WHERE phone = ?",
                    new Object[]{account.getPhone()}, new BeanPropertyRowMapper(ConfirmationCode.class));
        }
        catch (EmptyResultDataAccessException e) {
            throw new Exception("This phone hasn't been approved.", new Throwable("userDataWrong"));
        }

        if (!serverConfirmationCode.getCode().equalsIgnoreCase(account.getConfirmationCode())) {
            throw new Exception("Wrong confirmation code.", new Throwable("userDataWrong"));
        }

        if (!serverConfirmationCode.isActivated()) {
            throw new Exception("Confirmation code hasn't been activated.", new Throwable("userDataWrong"));
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(account.getPassword());
        jdbcOperations.update("INSERT INTO accounts (password, given_name, family_name, phone, email, communication_method, basic_info, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                hashedPassword, account.getGivenName(), account.getFamilyName(), account.getPhone(), account.getEmail(), account.getCommunicationMethod(), account.getBasicInfo(), account.getImageURL());
        return login(account.getPhone(), account.getPassword());
    }

    @Override
    public Account update(Account account) throws Exception {
        if (account.getGivenName() == "" || account.getFamilyName() == "" || account.getPhone() == "") {
            throw new Exception("Fields given name, family name and phone can't be empty.", new Throwable("userDataWrong"));
        }

        jdbcOperations.update("UPDATE accounts SET given_name = ?, family_name = ?, email = ?, communication_method = ?, basic_info = ?, image_url = ? WHERE id = ?;",
                account.getGivenName(), account.getFamilyName(), account.getEmail(), account.getCommunicationMethod(), account.getBasicInfo(), account.getImageURL(), account.getId());

        return get(account.getId());
    }

    @Override
    public void delete(long id) throws Exception {
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
        String token = jwtBuilder.signWith(SignatureAlgorithm.HS512, properties.getProperty("token.key")).compact();
        return token;
    }

}