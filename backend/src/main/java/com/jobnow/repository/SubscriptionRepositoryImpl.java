package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.City;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Integer> get(long id) throws ExpectedException {
        return jdbcOperations.queryForList("SELECT category_id FROM subscriptions WHERE user_id = ?;", new Object[]{id}, Integer.class);
    }

    @Override
    public List<Integer> update(long id, ArrayList<Integer> categories) throws ExpectedException {
        jdbcOperations.update("DELETE FROM subscriptions WHERE user_id = ?", new Object[]{id});
        for (int categoryId : categories) {
            jdbcOperations.update("INSERT INTO subscriptions (user_id, category_id) VALUES (?, ?);",
                    id, categoryId);
        }
        return get(id);
    }
}