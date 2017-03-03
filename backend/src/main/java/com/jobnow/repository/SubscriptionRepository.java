package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.City;
import com.jobnow.entity.DomainObject;

import java.util.ArrayList;

/**
 * Created by codex on 03.03.17.
 */
public interface SubscriptionRepository<V extends DomainObject> {

    ArrayList<City> get(long id) throws ExpectedException;

    ArrayList<City> create(long id, long cityId) throws ExpectedException;

    ArrayList<City> delete(long id, long cityId) throws ExpectedException;

}
