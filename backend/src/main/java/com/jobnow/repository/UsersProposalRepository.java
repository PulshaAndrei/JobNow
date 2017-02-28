package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.DomainObject;
import com.jobnow.entity.Order;

import java.util.ArrayList;

/**
 * Created by codex on 28.02.17.
 */
public interface UsersProposalRepository<V extends DomainObject> {

    ArrayList<Order> get(long id) throws ExpectedException;

    Order create(long id, long orderId, long proposal) throws ExpectedException;

    Order update(long id, long orderId, long proposal) throws ExpectedException;

    void delete(long id, long orderId) throws ExpectedException;
}
