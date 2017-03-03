package com.jobnow.repository;

import com.jobnow.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;

/**
 * Created by codex on 03.03.17.
 */
public class UserRepositoryImpl implements UserRepository<Account> {

    @Autowired
    protected JdbcOperations jdbcOperations;

}