package com.jobnow.entity;

/**
 * Created by codex on 06.02.17.
 */
public class City implements DomainObject{

    private Long id;
    private String countryName;
    private String cityName;

    public City(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }
}
