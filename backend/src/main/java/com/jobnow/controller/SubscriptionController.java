package com.jobnow.controller;

import com.jobnow.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by codex on 06.02.17.
 */

@CrossOrigin(origins = "*")
@Controller
public class SubscriptionController {
    @Value("${token.key}")
    private String tokenKey;

    @Autowired
    @Qualifier("subscriptionRepository")
    private SubscriptionRepository subscriptionRepository;

    @RequestMapping(value = "/subscription/categories", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getSubscriptions(@RequestHeader(value = "Authorization") String token) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        List result = subscriptionRepository.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/subscription/categories", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> createSubscriptionForCity(@RequestHeader(value = "Authorization") String token, @RequestBody Map<String, ArrayList<Integer>> objectMap) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        ArrayList<Integer> categories = objectMap.get("categories");
        List result = subscriptionRepository.update(id, categories);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}