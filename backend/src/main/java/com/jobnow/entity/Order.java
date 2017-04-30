package com.jobnow.entity;

/**
 * Created by codex on 06.02.17.
 */
public class Order implements DomainObject {

    private Long id;
    private Long userId;
    private String name = "";
    private String description = "";
    //private Long countryId;
    private Long locationCityId;
    private String address = "";
    private double locationCoordX;
    private double locationCoordY;
    private Long startWork;
    private Long endWork;
    private Long durationFrom;
    private Long durationTo;
    private Double priceFrom;
    private Double priceTo;
    private String priceCurrency; //TODO: change to currencyId
    private int categoryId = 0;
    private boolean allDay = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public boolean isAllDay() {
        return allDay;
    }

    public void setAllDay(boolean allDay) {
        this.allDay = allDay;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public Long getLocationCityId() {
        return locationCityId;
    }

    public void setLocationCityId(Long locationCityId) {
        this.locationCityId = locationCityId;
    }

    public double getLocationCoordX() {
        return locationCoordX;
    }

    public void setLocationCoordX(double locationCoordX) {
        this.locationCoordX = locationCoordX;
    }

    public double getLocationCoordY() {
        return locationCoordY;
    }

    public void setLocationCoordY(double locationCoordY) {
        this.locationCoordY = locationCoordY;
    }
}
