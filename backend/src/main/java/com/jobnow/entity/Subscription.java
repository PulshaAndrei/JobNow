package com.jobnow.entity;

/**
 * Created by codex on 06.02.17.
 */
public class Subscription {

    private Long id;
    private Long userId;
    private Long cityId;

    public Subscription(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }
}
