package com.jobnow.controller;

import com.jobnow.entity.Order;
import com.jobnow.repository.OrderRepository;
import com.jobnow.repository.UsersOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 06.02.17.
 */
@CrossOrigin(origins = "*")
@Controller
public class UsersOrderController {
    @Value("${token.key}")
    private String tokenKey;

    @Autowired
    @Qualifier("usersOrderRepository")
    private UsersOrderRepository usersOrderRepository;

    @Autowired
    @Qualifier("orderRepository")
    private OrderRepository orderRepository;

    @RequestMapping(value = "/users_order", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getUsersOrder(@RequestHeader(value="Authorization") String token) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        List result = usersOrderRepository.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/users_order", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> createUsersOrder(@RequestHeader(value="Authorization") String token, @RequestBody Order order) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        order.setUserId(id);
        int result = usersOrderRepository.create(order);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/users_order/{orderId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> createUsersOrder(@RequestHeader(value="Authorization") String token, @PathVariable long orderId) throws ExpectedException {
        Authorization.getUserId(token, tokenKey);
        Order result = orderRepository.getById(orderId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/users_order/{orderId}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> updateUsersOrderDetails(@RequestHeader(value="Authorization") String token, @RequestBody Order order, @PathVariable long orderId) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        order.setUserId(id);
        order.setId(orderId);
        Order result = usersOrderRepository.updateDetails(order);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/users_order/{orderId}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteUsersOrder(@RequestHeader(value="Authorization") String token, @PathVariable long orderId) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        usersOrderRepository.delete(id, orderId);
    }

}
