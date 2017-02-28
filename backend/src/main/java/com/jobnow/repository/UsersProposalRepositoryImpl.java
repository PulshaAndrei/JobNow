package com.jobnow.repository;

import com.jobnow.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

/**
 * Created by codex on 28.02.17.
 */

@Repository("usersProposalRepository")

public class UsersProposalRepositoryImpl implements UsersOrderRepository<Order> {

    @Autowired
    protected JdbcOperations jdbcOperations;

}