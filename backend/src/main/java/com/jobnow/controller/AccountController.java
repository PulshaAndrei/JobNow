package com.jobnow.controller;

import com.jobnow.entity.Account;
import com.jobnow.entity.ConfirmationCode;
import com.jobnow.repository.AccountRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.google.common.collect.ImmutableMap;

import java.util.Date;
import java.util.Map;

/**
 * Created by Andrei on 11.12.2016.
 */
@CrossOrigin(origins = "*")
@Controller
public class AccountController {

    @Autowired
    @Qualifier("accountRepository")
    private AccountRepository accountRepository;

    @RequestMapping(value = "/auth/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody Map<String, Object> loginObject) throws ExpectedException {
        String result = accountRepository.login((String) loginObject.get("username"), (String) loginObject.get("password"));
        return new ResponseEntity<>(ImmutableMap.of("token", result), HttpStatus.OK);
    }

    @RequestMapping(value = "/account/phone_confirmation", method = RequestMethod.POST)
    @ResponseBody
    public void phoneConfirmation(@RequestBody ConfirmationCode confirmationCode) throws ExpectedException {
        accountRepository.phoneConfirmation(confirmationCode.getPhone());
    }

    @RequestMapping(value = "/account/phone_confirmation", method = RequestMethod.PUT)
    @ResponseBody
    public void activateConfirmationCode(@RequestBody ConfirmationCode confirmationCode) throws ExpectedException {
        accountRepository.activateConfirmationCode(confirmationCode);
    }

    @RequestMapping(value = "/account", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> get(@RequestHeader(value="Authorization") String token) throws ExpectedException {
        long id = getUserId(token);
        Account result = accountRepository.get(id);
        return new ResponseEntity<>(ImmutableMap.of("account", result), HttpStatus.OK);
    }

    @RequestMapping(value = "/account", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> create(@RequestBody Account account) throws ExpectedException {
        String result = accountRepository.create(account);
        return new ResponseEntity<>(ImmutableMap.of("token", result), HttpStatus.OK);
    }

    @RequestMapping(value = "/account", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody Account account, @RequestHeader(value="Authorization") String token) throws ExpectedException {
        long id = getUserId(token);
        account.setId(id);
        Account result = accountRepository.update(account);
        return new ResponseEntity<>(ImmutableMap.of("account", result), HttpStatus.OK);
    }

    @RequestMapping(value = "/account", method = RequestMethod.DELETE)
    @ResponseBody
    public void delete(@RequestHeader(value="Authorization") String token) throws ExpectedException {
        long id = getUserId(token);
        accountRepository.delete(id);
    }

    public long getUserId(String token) throws ExpectedException {
        String key = "JobNowKey";
        Claims claims;
        try {
            claims = (Claims) Jwts.parser().setSigningKey(key).parse(token).getBody();
        } catch (Exception ex) {
            throw new ExpectedException("Token corrupted", HttpStatus.UNAUTHORIZED);
        }
        if (claims.get("token_expiration_date") == null)
            throw new ExpectedException("Invalid token", HttpStatus.UNAUTHORIZED);
        Date expiredDate = new Date((long) claims.get("token_expiration_date"));
        if (expiredDate.after(new Date()))
            return (Integer) claims.get("userID");
        else
            throw new ExpectedException("Token expired date error", HttpStatus.UNAUTHORIZED);
    }
}
