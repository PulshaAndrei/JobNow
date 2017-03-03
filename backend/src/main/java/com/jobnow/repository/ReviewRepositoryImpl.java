package com.jobnow.repository;

import com.jobnow.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;

/**
 * Created by codex on 03.03.17.
 */
public class ReviewRepositoryImpl implements ReviewRepository<Review> {

    @Autowired
    protected JdbcOperations jdbcOperations;

}