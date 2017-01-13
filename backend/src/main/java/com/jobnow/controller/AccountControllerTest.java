package com.jobnow.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobnow.entity.ConfirmationCode;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.jobnow.Application;
import com.jobnow.entity.Account;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by Andrei on 18.12.2016.
 */

public class AccountControllerTest {

    private String phone = "375445798272";
    private String password = "111";
    private String wrongPassword = "notTest";
    private String baseURL = "http://localhost:8080/";
    private static boolean setUpIsDone = false;

    @Autowired
    private Application application;

    @Before
    public void setup() {
        if (!setUpIsDone) {
            this.application = new Application();
            String[] args = {"test"};
            application.main(args);
            setUpIsDone = true;
        }
    }

    @Test
    public void login() throws Exception {
        HashMap account = new HashMap();
        account.put("username", phone);
        account.put("password", password);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(account);

        HttpResponse<JsonNode> response = Unirest.post(baseURL + "auth/login")
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .body(json)
                .asJson();

        assertNotNull(response.getBody().getObject().getString("token"));
    }

    @Test
    public void incorrectCredential() throws Exception {
        Account account = new Account();
        account.setPhone(phone);
        account.setPassword(wrongPassword);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(account);

        HttpResponse<JsonNode> response = Unirest.post(baseURL + "auth/login")
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .body(json)
                .asJson();

        assertEquals(response.getBody().getObject().getString("message"), "Incorrect phone or password.");
    }

    @Test
    public void sendConfirmationCode() throws Exception {
        ConfirmationCode confirmationCode = new ConfirmationCode();
        confirmationCode.setPhone(phone);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(confirmationCode);

        HttpResponse<JsonNode> response = Unirest.post(baseURL + "account/phone_confirmation")
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .body(json)
                .asJson();

        assertEquals("ok", response.getBody().getObject().getString("message"));
    }
}