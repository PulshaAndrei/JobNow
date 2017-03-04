package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.DomainObject;
import com.jobnow.entity.Review;

import java.util.List;

/**
 * Created by codex on 03.03.17.
 */
public interface ReviewRepository<V extends DomainObject> {

    List<Review> get(long id) throws ExpectedException;

    Review create(long id, long userId, Review review) throws ExpectedException;
}