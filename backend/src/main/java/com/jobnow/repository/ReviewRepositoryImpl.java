package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Review;
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

@Repository("reviewRepository")
public class ReviewRepositoryImpl implements ReviewRepository<Review> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Override
    public List<Review> get(long id) throws ExpectedException {
        return jdbcOperations.query("SELECT * FROM reviews WHERE user_to_id = ?;",
                new Object[]{id},
                new BeanPropertyRowMapper(Review.class));
    }

    @Override
    public Review create(long id, long userId, Review review) throws ExpectedException {
        if (review.getTitle() == "" || review.getRate() == 0) {
            throw new ExpectedException("Fields title and rate can't be empty.", HttpStatus.BAD_REQUEST);
        }
        if (userId == id) {
            throw new ExpectedException("You can't leave review for yourself.", HttpStatus.BAD_REQUEST);
        }

        jdbcOperations.update("INSERT INTO reviews (user_from_id, user_to_id, title, text, rate) VALUES (?, ?, ?, ?, ?);",
                id, userId, review.getTitle(), review.getText(), review.getRate());
        return review;
    }
}