package com.jobnow.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Bet;
import com.jobnow.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 28.02.17.
 */

@Repository("usersProposalRepository")

public class UsersProposalRepositoryImpl implements UsersProposalRepository<Order> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Autowired
    @Qualifier("orderRepository")
    private OrderRepository orderRepository;

    @Autowired
    @Qualifier("devicesRepository")
    private DevicesRepository devicesRepository;

    @Override
    public List<Order> get(long id) throws ExpectedException {
        List<Bet> bets = jdbcOperations.query( "SELECT order_id FROM bets WHERE user_id = ?",
                new Object[]{id},
                new BeanPropertyRowMapper(Bet.class));
        List<Order> orders = new ArrayList<>();
        for (int i = 0; i < bets.size(); i++) {
            try {
                orders.add(orderRepository.getById(bets.get(i).getOrderId()));
            }
            catch (ExpectedException e) {}
        }
        return orders;
    }

    private Bet getById(long userId, long orderId) throws ExpectedException {
        try {
            return (Bet) jdbcOperations.queryForObject(
                    "SELECT * FROM bets WHERE user_id = ? AND order_id = ?",
                    new Object[]{userId, orderId},
                    new BeanPropertyRowMapper(Bet.class));
        }
        catch (EmptyResultDataAccessException e) {
            throw new ExpectedException("This bet doesn't exist.", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public Bet create(long id, long orderId, double proposal) throws ExpectedException {
        jdbcOperations.update("INSERT INTO bets (user_id, order_id, price) VALUES (?, ?, ?);", new Object[]{id, orderId, proposal});
        Bet bet = getById(id, orderId);
        try {
            devicesRepository.sendNotificationsNewProposal(bet);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return bet;
    }

    @Override
    public Bet update(long id, long orderId, double proposal) throws ExpectedException {
        jdbcOperations.update("UPDATE bets SET price = ? WHERE user_id = ? AND order_id = ?;", new Object[]{proposal, id, orderId});
        return getById(id, orderId);
    }

    @Override
    public void delete(long id, long orderId) throws ExpectedException {
        jdbcOperations.update("DELETE FROM bets WHERE user_id = ? AND order_id = ?", new Object[]{id, orderId});
    }
}