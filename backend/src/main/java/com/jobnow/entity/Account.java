package com.jobnow.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by Andrei on 11.12.2016.
 */

public class Account implements DomainObject {

    private long id;
    private String password = "";
    private String givenName = "";
    private String familyName = "";
    private String phone = "";
    private String email = "";
    private int communicationMethod = 0;
    private String basicInfo = "";
    private String imageURL = "";
    private String imageData = ""; //TODO
    private String confirmationCode = "";
    private double rate = 0;

    public Account() {}

    @JsonIgnore
    @JsonProperty(value = "user_id")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @JsonIgnore
    @JsonProperty(value = "user_password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getCommunicationMethod() {
        return communicationMethod;
    }

    public void setCommunicationMethod(int communicationMethod) {
        this.communicationMethod = communicationMethod;
    }

    public String getBasicInfo() {
        return basicInfo;
    }

    public void setBasicInfo(String basicInfo) {
        this.basicInfo = basicInfo;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    @JsonIgnore
    @JsonProperty(value = "user_image_data")
    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    @JsonIgnore
    @JsonProperty(value = "user_confirmation_code")
    public String getConfirmationCode() {
        return confirmationCode;
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }
}
