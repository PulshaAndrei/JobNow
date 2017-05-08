package com.jobnow.entity;

/**
 * Created by codex on 06.02.17.
 */
public class Device implements DomainObject{

    private Long id;
    private int userId;
    private String token;

    public Device(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
