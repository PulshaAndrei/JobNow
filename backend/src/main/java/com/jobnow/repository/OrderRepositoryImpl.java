package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Bet;
import com.jobnow.entity.City;
import com.jobnow.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 03.03.17.
 */

@Repository("orderRepository")
public class OrderRepositoryImpl implements OrderRepository<Order> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<City> getCities() throws ExpectedException {
        return jdbcOperations.query("SELECT * FROM cities ORDER BY id;",
                new BeanPropertyRowMapper(City.class));
    }

    @Override
    public Order getById(long orderId) throws ExpectedException {
        try {
            Order order = (Order) jdbcOperations.queryForObject(
                    "SELECT id, user_id, name, description, start_work, end_work, duration_from, duration_to, address, location_city_id, location_coord_x, location_coord_y, price_currency, price_from, price_to, all_day, category_id FROM orders WHERE id = ?",
                    new Object[]{orderId},
                    new BeanPropertyRowMapper(Order.class));
            order.setBets(jdbcOperations.query(
                    "SELECT * FROM bets WHERE order_id = ?",
                    new Object[]{orderId},
                    new BeanPropertyRowMapper(Bet.class)));
            return order;
        }
        catch (EmptyResultDataAccessException e) {
            throw new ExpectedException("This order doesn't exist.", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<Order> getByCategories(Long userID, int[] categories) throws ExpectedException {
        List<Order> orders = new ArrayList<>();
        for (int categoryId : categories) {
            orders.addAll(jdbcOperations.query("SELECT id FROM orders WHERE category_id = ? AND user_id != ?",
                    new Object[]{categoryId, userID},
                    new BeanPropertyRowMapper(Order.class)));
        }
        for (int i = 0; i < orders.size(); i++) {
            orders.set(i, getById(orders.get(i).getId()));
        }
        return orders;
    }
}
