package com.jobnow.repository;

import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Account;
import com.jobnow.entity.DomainObject;

/**
 * Created by codex on 03.03.17.
 */
public interface UserRepository<V extends DomainObject> {
    Account get(long id) throws ExpectedException;
}
