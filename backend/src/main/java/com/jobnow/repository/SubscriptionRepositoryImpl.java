package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 03.03.17.
 */

@Repository("subscriptionRepository")
public class SubscriptionRepositoryImpl  implements SubscriptionRepository<City> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<City> get(long id) throws ExpectedException {
        return jdbcOperations.query("SELECT c.id, c.city FROM subscriptions s left join cities c on s.city_id = c.id WHERE user_id = ?;",
                new Object[]{id},
                new BeanPropertyRowMapper(City.class));
    }

    private boolean existSubscription(long id, long cityId) {
        List<City> cities = jdbcOperations.query("SELECT * FROM subscriptions WHERE user_id = ? AND  city_id = ?;",
                new Object[]{id, cityId},
                new BeanPropertyRowMapper(City.class));
        return cities.size() != 0;
    }

    @Override
    public List<City> create(long id, long cityId) throws ExpectedException {
        if (existSubscription(id, cityId)) {
            throw new ExpectedException("This subscription already exist.", HttpStatus.BAD_REQUEST);
        }

        jdbcOperations.update("INSERT INTO subscriptions (user_id, city_id) VALUES (?, ?);",
                id, cityId);
        return get(id);
    }

    @Override
    public List<City> delete(long id, long cityId) throws ExpectedException {
        if (!existSubscription(id, cityId)) {
            throw new ExpectedException("This subscription is not found.", HttpStatus.BAD_REQUEST);
        }

        jdbcOperations.update("DELETE FROM subscriptions WHERE user_id = ? AND city_id = ?",
                new Object[]{id, cityId}, new BeanPropertyRowMapper(City.class));
        return get(id);
    }
}