package com.jobnow.controller;

import com.jobnow.entity.Order;
import com.jobnow.entity.Review;
import com.jobnow.repository.ReviewRepository;
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
public class ReviewController {

    @Value("${token.key}")
    private String tokenKey;

    @Autowired
    @Qualifier("reviewRepository")
    private ReviewRepository reviewRepository;

    @RequestMapping(value = "/review/{user_id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getReviewsByUserId(@RequestHeader(value = "Authorization") String token, @PathVariable long userId) throws ExpectedException {
        Authorization.getUserId(token, tokenKey);
        ArrayList result = reviewRepository.get(userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/review/{user_id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> createReviewsByUserId(@RequestHeader(value = "Authorization") String token, @PathVariable long userId, @RequestBody Review review) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        Review result = reviewRepository.create(id, userId, review);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
