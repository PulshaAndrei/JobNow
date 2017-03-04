package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.City;
import com.jobnow.entity.DomainObject;

import java.util.List;

/**
 * Created by codex on 03.03.17.
 */
public interface SubscriptionRepository<V extends DomainObject> {

    List<City> get(long id) throws ExpectedException;

    List<City> create(long id, long cityId) throws ExpectedException;

    List<City> delete(long id, long cityId) throws ExpectedException;

}
