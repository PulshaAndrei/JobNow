package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Bet;
import com.jobnow.entity.DomainObject;
import com.jobnow.entity.Order;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codex on 28.02.17.
 */
public interface UsersProposalRepository<V extends DomainObject> {

    List<Bet> get(long id) throws ExpectedException;

    Bet create(long id, long orderId, double proposal) throws ExpectedException;

    Bet update(long id, long orderId, double proposal) throws ExpectedException;

    void delete(long id, long orderId) throws ExpectedException;
}
