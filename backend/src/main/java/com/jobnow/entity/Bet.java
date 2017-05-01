package com.jobnow.entity;

/**
 * Created by codex on 06.02.17.
 */
public class Bet implements DomainObject {

    private Long id;
    private Long userId;
    private Long orderId;
    private Double price = 0.0;

    public Bet() {}

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
