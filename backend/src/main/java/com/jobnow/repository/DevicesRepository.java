package com.jobnow.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Bet;
import com.jobnow.entity.Device;
import com.jobnow.entity.DomainObject;
import com.jobnow.entity.Order;

/**
 * Created by codex on 03.03.17.
 */
public interface DevicesRepository<V extends DomainObject> {

    void create(Device device) throws ExpectedException;

    void delete(Device device) throws ExpectedException;

    int sendNotificationsNewOrder(Order order) throws JsonProcessingException;

    void sendNotificationsNewProposal(Bet bet) throws ExpectedException, JsonProcessingException;
}