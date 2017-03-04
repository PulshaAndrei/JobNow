package com.jobnow.controller;

import com.jobnow.entity.City;
import com.jobnow.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

/**
 * Created by codex on 06.02.17.
 */
public class SubscriptionController {
    @Value("${token.key}")
    private String tokenKey;

    @Autowired
    @Qualifier("subscriptionRepository")
    private SubscriptionRepository subscriptionRepository;

    @RequestMapping(value = "/subscription/city", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSubscriptions(@RequestHeader(value = "Authorization") String token) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        ArrayList result = subscriptionRepository.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/subscription/city", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> createSubscriptionForCity(@RequestHeader(value = "Authorization") String token, @RequestParam long cityId) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        ArrayList result = subscriptionRepository.create(id, cityId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/subscription/city", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteSubscriptionForCity(@RequestHeader(value = "Authorization") String token, @RequestParam long cityId) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        ArrayList result = subscriptionRepository.delete(id, cityId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
