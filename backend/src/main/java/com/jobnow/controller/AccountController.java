package com.jobnow.controller;

import com.jobnow.entity.Account;
import com.jobnow.entity.ConfirmationCode;
import com.jobnow.repository.AccountRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

/**
 * Created by Andrei on 11.12.2016.
 */
@CrossOrigin(origins = "*")
@Controller
public class AccountController extends ExceptionHandlerController {

    @Autowired
    @Qualifier("accountRepository")
    private AccountRepository accountRepository;

    @RequestMapping(value = "/auth/login", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> login(@RequestBody Map<String, Object> loginObject) throws RestException {
        try {
            String result = accountRepository.login((String) loginObject.get("username"), (String) loginObject.get("password"));
            return Ajax.successResponse("token", result);
        } catch (Exception e) {
            return Ajax.errorResponse(e);
        }
    }

    @RequestMapping(value = "/account/phone_confirmation", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> phoneConfirmation(@RequestBody ConfirmationCode confirmationCode) throws RestException {
        try {
            accountRepository.phoneConfirmation(confirmationCode.getPhone());
            return Ajax.emptyResponse();
        } catch (Exception e) {
            return Ajax.errorResponse(e);
        }
    }

    @RequestMapping(value = "/account/phone_confirmation", method = RequestMethod.PUT)
    public @ResponseBody
    Map<String, Object> activateConfirmationCode(@RequestBody ConfirmationCode confirmationCode) throws RestException {
        try {
            accountRepository.activateConfirmationCode(confirmationCode);
            return Ajax.emptyResponse();
        } catch (Exception e) {
            return Ajax.errorResponse(e);
        }
    }

    @RequestMapping(value = "/account", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> get(@RequestHeader(value="Authorization") String token) throws RestException {
        try {
            long id = getUserId(token);
            Account result = accountRepository.get(id);
            return Ajax.successResponse("account", result);
        } catch (Exception e) {
            return Ajax.errorResponse(e);
        }
    }

    @RequestMapping(value = "/account", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> create(@RequestBody Account account) throws RestException {
        try {
            String result = accountRepository.create(account);
            return Ajax.successResponse("token", result);
        } catch (Exception e) {
            return Ajax.errorResponse(e);
        }
    }

    @RequestMapping(value = "/account", method = RequestMethod.PUT)
    public @ResponseBody
    Map<String, Object> update(@RequestBody Account account, @RequestHeader(value="Authorization") String token) throws RestException {
        try {
            long id = getUserId(token);
            account.setId(id);
            Account result = accountRepository.update(account);
            return Ajax.successResponse("account", result);
        } catch (Exception e) {
            return Ajax.errorResponse(e);
        }
    }

    @RequestMapping(value = "/account", method = RequestMethod.DELETE)
    public @ResponseBody
    Map<String, Object> delete(@RequestHeader(value="Authorization") String token) throws RestException {
        try {
            long id = getUserId(token);
            accountRepository.delete(id);
            return Ajax.emptyResponse();
        } catch (Exception e) {
            return Ajax.errorResponse(e);
        }
    }

    public long getUserId(String token) throws Exception {
        String key = "JobNowKey";
        Claims claims;
        try {
            claims = (Claims) Jwts.parser().setSigningKey(key).parse(token).getBody();
        } catch (Exception ex) {
            throw new Exception("Token corrupted", new Throwable("authError"));
        }
        if (claims.get("token_expiration_date") == null)
            throw new Exception("Invalid token", new Throwable("authError"));
        Date expiredDate = new Date((long) claims.get("token_expiration_date"));
        if (expiredDate.after(new Date()))
            return (Integer) claims.get("userID");
        else
            throw new Exception("Token expired date error", new Throwable("authError"));
    }
}
