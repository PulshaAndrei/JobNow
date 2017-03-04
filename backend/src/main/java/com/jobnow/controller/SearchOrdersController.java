package com.jobnow.controller;

import com.jobnow.entity.Order;
import com.jobnow.repository.OrderRepository;
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
public class SearchOrdersController {

    @Value("${token.key}")
    private String tokenKey;

    @Autowired
    @Qualifier("orderRepository")
    private OrderRepository orderRepository;

    @RequestMapping(value = "/common_data/cities", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getListOfCities(@RequestHeader(value="Authorization") String token) throws ExpectedException {
        Authorization.getUserId(token, tokenKey);
        List result = orderRepository.getCities();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/order/{orderId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getOrderById(@RequestHeader(value="Authorization") String token, @PathVariable long orderId) throws ExpectedException {
        long id = Authorization.getUserId(token, tokenKey);
        Order result = orderRepository.getById(id, orderId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/order", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getOrderByCity(@RequestHeader(value="Authorization") String token, @RequestParam long cityId) throws ExpectedException {
        Authorization.getUserId(token, tokenKey);
        List result = orderRepository.getByCityId(cityId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
