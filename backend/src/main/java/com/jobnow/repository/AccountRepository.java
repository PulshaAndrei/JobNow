package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Account;
import com.jobnow.entity.ConfirmationCode;
import com.jobnow.entity.DomainObject;

/**
 * Created by Andrei on 11.12.2016.
 */
public interface AccountRepository<V extends DomainObject> {

    String login(String phone, String password) throws ExpectedException;

    Account get(long id) throws ExpectedException;

    String create(Account account) throws ExpectedException;

    Account update(Account account) throws ExpectedException;

    void delete(long id) throws ExpectedException;

    void phoneConfirmation(String phone) throws ExpectedException;

    void activateConfirmationCode(ConfirmationCode confirmationCode) throws ExpectedException;
}