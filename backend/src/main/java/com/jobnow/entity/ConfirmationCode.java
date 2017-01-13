package com.jobnow.entity;

/**
 * Created by codex on 12.01.17.
 */
public class ConfirmationCode implements DomainObject {

    private String phone = "";
    private String code = "";
    private long expirationDate = 0;
    private boolean activated = false;

    public ConfirmationCode() {}

    public ConfirmationCode(String phone, String code) {
        this.phone = phone;
        this.code = code;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public long getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(long expirationDate) {
        this.expirationDate = expirationDate;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }
}
