package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.City;
import com.jobnow.entity.DomainObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 03.03.17.
 */
public interface SubscriptionRepository<V extends DomainObject> {

    List<Integer> get(long id) throws ExpectedException;

    List<Integer> update(long id, ArrayList<Integer> categories) throws ExpectedException;;
}
