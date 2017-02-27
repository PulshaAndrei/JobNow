package com.jobnow.entity;

import java.awt.geom.Point2D;

/**
 * Created by codex on 06.02.17.
 */
public class Order implements DomainObject {

    private Long id;
    private Long creatorId;
    private String name = "";
    private String description = "";
    private Long countryId;
    private Long cityId;
    private String address = "";
    private Point2D location;
    private Long startWork;
    private Long endWork;
    private Long durationFrom;
    private Long durationTo;
    private Double priceFrom;
    private Double priceTo;
    private String priceCurrency; //TODO: change to currencyId

    public Order(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Long getStartWork() {
        return startWork;
    }

    public void setStartWork(Long startWork) {
        this.startWork = startWork;
    }

    public Long getEndWork() {
        return endWork;
    }

    public void setEndWork(Long endWork) {
        this.endWork = endWork;
    }

    public Long getDurationFrom() {
        return durationFrom;
    }

    public void setDurationFrom(Long durationFrom) {
        this.durationFrom = durationFrom;
    }

    public Long getDurationTo() {
        return durationTo;
    }

    public void setDurationTo(Long durationTo) {
        this.durationTo = durationTo;
    }

    public Point2D getLocation() {
        return location;
    }

    public void setLocation(Point2D location) {
        this.location = location;
    }

    public Double getPriceFrom() {
        return priceFrom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPriceFrom(Double priceFrom) {
        this.priceFrom = priceFrom;
    }

    public Double getPriceTo() {
        return priceTo;
    }

    public void setPriceTo(Double priceTo) {
        this.priceTo = priceTo;
    }

    public String getPriceCurrency() {
        return priceCurrency;
    }

    public void setPriceCurrency(String priceCurrency) {
        this.priceCurrency = priceCurrency;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }
}
