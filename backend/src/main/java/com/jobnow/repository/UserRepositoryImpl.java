package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

/**
 * Created by codex on 03.03.17.
 */
@Repository("userRepository")
public class UserRepositoryImpl implements UserRepository<Account> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public Account get(long id) throws ExpectedException {
        try {
            return (Account) jdbcOperations.queryForObject("SELECT id, given_name, family_name, phone, email, communication_method, basic_info, image_url FROM accounts WHERE id = ?",
                    new Object[]{id}, new BeanPropertyRowMapper(Account.class));
        }
        catch (EmptyResultDataAccessException e) {
            throw new ExpectedException("This account doesn't exist.", HttpStatus.NOT_FOUND);
        }
    }
}