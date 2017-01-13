package com.jobnow.repository;

import com.jobnow.entity.Account;
import com.jobnow.entity.ConfirmationCode;
import com.jobnow.entity.DomainObject;

/**
 * Created by Andrei on 11.12.2016.
 */
public interface AccountRepository<V extends DomainObject> {

    String login(String phone, String password) throws Exception;

    Account get(long id) throws Exception;

    String create(Account account) throws Exception;

    Account update(Account account) throws Exception;

    void delete(long id) throws Exception;

    void phoneConfirmation(String phone) throws Exception;

    void activateConfirmationCode(ConfirmationCode confirmationCode) throws Exception;
}