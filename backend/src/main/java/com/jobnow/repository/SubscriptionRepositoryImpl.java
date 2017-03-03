package com.jobnow.repository;

import com.jobnow.entity.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;

/**
 * Created by codex on 03.03.17.
 */
public class SubscriptionRepositoryImpl  implements SubscriptionRepository<City> {

    @Autowired
    protected JdbcOperations jdbcOperations;

}