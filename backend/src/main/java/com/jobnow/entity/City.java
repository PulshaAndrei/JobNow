package com.jobnow.entity;

/**
 * Created by codex on 06.02.17.
 */
public class City implements DomainObject{

    private Long id;
    //private String country;
    private String city;

    public City(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /*public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }*/

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
