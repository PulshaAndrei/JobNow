package com.jobnow.controller;

import com.jobnow.entity.Order;
import com.jobnow.repository.UsersProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by codex on 06.02.17.
 */
public class UsersProposalController {
    @Autowired
    @Qualifier("usersProposalRepository")
    private UsersProposalRepository usersProposalRepository;

    @RequestMapping(value = "/users_proposal", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getUsersProposals(@RequestHeader(value="Authorization") String token) throws ExpectedException {
        long id = Authorization.getUserId(token);
        ArrayList<Order> result = usersProposalRepository.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //TODO: fix documentation

    @RequestMapping(value = "/users_proposal/{orderId}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> createUsersProposal(@RequestHeader(value="Authorization") String token, @RequestBody Map<String, Object> proposal, @PathVariable long orderId) throws ExpectedException {
        long id = Authorization.getUserId(token);
        Order result = usersProposalRepository.create(id, orderId, (long) proposal.get("proposal"));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/users_proposal/{orderId}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> updateUsersProposal(@RequestHeader(value="Authorization") String token, @RequestBody Map<String, Object> proposal, @PathVariable long orderId) throws ExpectedException {
        long id = Authorization.getUserId(token);
        Order result = usersProposalRepository.update(id, orderId, (int) proposal.get("proposal"));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/users_proposal/{orderId}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteUsersProposal(@RequestHeader(value="Authorization") String token, @PathVariable long orderId) throws ExpectedException {
        long id = Authorization.getUserId(token);
        usersProposalRepository.delete(id, orderId);
    }
}
