package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 27.02.17.
 */


@Repository("usersOrderRepository")

public class UsersOrderRepositoryImpl implements UsersOrderRepository<Order> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<Order> get(long id) throws ExpectedException {
        return jdbcOperations.query("SELECT id, user_id, name, description, start_work, end_work, duration_from, duration_to, location_city_id, location_coord_x, location_coord_y, price_currency, price_from, price_to FROM orders WHERE user_id = ?",
                new Object[]{id},
                new BeanPropertyRowMapper(Order.class));
    }

    @Override
    public Order create(Order order) throws ExpectedException {
        jdbcOperations.update("INSERT INTO orders (user_id, name, description, start_work, end_work, duration_from, duration_to, address, location_city_id, location_coord_x, location_coord_y, price_currency, price_from, price_to) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                order.getUserId(), order.getName(), order.getDescription(), order.getStartWork(), order.getEndWork(), order.getDurationFrom(), order.getDurationTo(), order.getAddress(), order.getLocationCityId(), order.getLocationCoordX(), order.getLocationCoordY(), order.getPriceCurrency(), order.getPriceFrom(), order.getPriceTo());
        return order;
    }

    @Override
    public Order updateDetails(Order order) throws ExpectedException {
        jdbcOperations.update("UPDATE orders SET user_id = ?, name = ?, description = ?, start_work = ?, end_work = ?, duration_from = ?, duration_to = ?, address = ?, location_city_id = ?, location_coord_x = ?, location_coord_y = ?, price_currency = ?, price_from = ?, price_to = ? WHERE id = ?;",
                order.getUserId(), order.getName(), order.getDescription(), order.getStartWork(), order.getEndWork(), order.getDurationFrom(), order.getDurationTo(), order.getAddress(), order.getLocationCityId(), order.getLocationCoordX(), order.getLocationCoordY(), order.getPriceCurrency(), order.getPriceFrom(), order.getPriceTo(), order.getId());
        return order;
    }

    @Override
    public void delete(long id, long orderId) throws ExpectedException {
        jdbcOperations.update("DELETE FROM orders WHERE user_id = ? AND id = ?", new Object[]{id, orderId});
    }
}
