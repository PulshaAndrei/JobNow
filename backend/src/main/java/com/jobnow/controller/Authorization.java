package com.jobnow.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;

import java.util.Date;

/**
 * Created by codex on 27.02.17.
 */
public class Authorization {

    public static long getUserId(String token) throws ExpectedException {
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
