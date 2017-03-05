package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.DomainObject;
import com.jobnow.entity.Order;

import java.util.List;

/**
 * Created by codex on 27.02.17.
 */
public interface UsersOrderRepository<V extends DomainObject> {

    List<Order> get(long id) throws ExpectedException;

    Order create(Order order) throws ExpectedException;

    Order updateDetails(Order order) throws ExpectedException;

    void delete(long id, long orderId) throws ExpectedException;
}
