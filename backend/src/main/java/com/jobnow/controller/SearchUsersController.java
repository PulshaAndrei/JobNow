package com.jobnow.controller;

import com.jobnow.entity.Account;
import com.jobnow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by codex on 06.02.17.
 */
public class SearchUsersController {
    @Autowired
    @Qualifier("userRepository")
    private UserRepository userRepository;

    @RequestMapping(value = "/user/{user_id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getUsersOrder(@RequestHeader(value = "Authorization") String token, @PathVariable long userId) throws ExpectedException {
        long id = Authorization.getUserId(token);
        Account result = userRepository.get(userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
