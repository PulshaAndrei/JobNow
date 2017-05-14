package com.jobnow.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 27.02.17.
 */


@Repository("usersOrderRepository")

public class UsersOrderRepositoryImpl implements UsersOrderRepository<Order> {

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
        List<Order> orders = jdbcOperations.query("SELECT id FROM orders WHERE user_id = ?",
                new Object[]{id},
                new BeanPropertyRowMapper(Order.class));
        for (int i = 0; i < orders.size(); i++) {
            orders.set(i, orderRepository.getById(orders.get(i).getId()));
        }
        return orders;
    }

    @Override
    public int create(Order order) throws ExpectedException {
        /*jdbcOperations.update("INSERT INTO orders (user_id, name, description, start_work, end_work, duration_from, duration_to, address, location_city_id, location_coord_x, location_coord_y, price_currency, price_from, price_to, all_day, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                order.getUserId(), order.getName(), order.getDescription(), order.getStartWork(), order.getEndWork(), order.getDurationFrom(), order.getDurationTo(), order.getAddress(), order.getLocationCityId(), order.getLocationCoordX(), order.getLocationCoordY(), order.getPriceCurrency(), order.getPriceFrom(), order.getPriceTo(), order.isAllDay(), order.getCategoryId());
*/
        final String INSERT_SQL = "INSERT INTO orders (user_id, name, description, start_work, end_work, duration_from, duration_to, address, location_city_id, location_coord_x, location_coord_y, price_currency, price_from, price_to, all_day, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcOperations.update(
                new PreparedStatementCreator() {
                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                        PreparedStatement ps =
                                connection.prepareStatement(INSERT_SQL, new String[] {"id"});
                        ps.setLong(1, order.getUserId());
                        ps.setString(2, order.getName());
                        ps.setString(3, order.getDescription());
                        ps.setLong(4, order.getStartWork());
                        ps.setLong(5, order.getEndWork());
                        ps.setLong(6, order.getDurationFrom());
                        ps.setLong(7, order.getDurationTo());
                        ps.setString(8, order.getAddress());
                        ps.setLong(9, order.getLocationCityId());
                        ps.setDouble(10, order.getLocationCoordX());
                        ps.setDouble(11, order.getLocationCoordY());
                        ps.setString(12, order.getPriceCurrency());
                        ps.setDouble(13, order.getPriceFrom());
                        ps.setDouble(14, order.getPriceTo());
                        ps.setBoolean(15, order.isAllDay());
                        ps.setLong(16, order.getCategoryId());
                        return ps;
                    }
                },
                keyHolder);

        order.setId(keyHolder.getKey().longValue());

        int notificationsCount = 0;
        try {
            notificationsCount = devicesRepository.sendNotificationsNewOrder(order);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return notificationsCount;
    }

    @Override
    public Order updateDetails(Order order) throws ExpectedException {
        jdbcOperations.update("UPDATE orders SET user_id = ?, name = ?, description = ?, start_work = ?, end_work = ?, duration_from = ?, duration_to = ?, address = ?, location_city_id = ?, location_coord_x = ?, location_coord_y = ?, price_currency = ?, price_from = ?, price_to = ?, all_day = ?, category_id = ? WHERE id = ?;",
                order.getUserId(), order.getName(), order.getDescription(), order.getStartWork(), order.getEndWork(), order.getDurationFrom(), order.getDurationTo(), order.getAddress(), order.getLocationCityId(), order.getLocationCoordX(), order.getLocationCoordY(), order.getPriceCurrency(), order.getPriceFrom(), order.getPriceTo(), order.isAllDay(), order.getCategoryId(), order.getId());
        return order;
    }

    @Override
    public void delete(long id, long orderId) throws ExpectedException {
        jdbcOperations.update("DELETE FROM orders WHERE user_id = ? AND id = ?", new Object[]{id, orderId});
    }
}
