package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.City;
import com.jobnow.entity.DomainObject;
import com.jobnow.entity.Order;

import java.util.ArrayList;

/**
 * Created by codex on 03.03.17.
 */
public interface OrderRepository<V extends DomainObject> {

    ArrayList<City> getCities() throws  ExpectedException;

    Order getById(long id, long orderId) throws ExpectedException;

    ArrayList<Order> getByCityId(long cityId) throws ExpectedException;
}
