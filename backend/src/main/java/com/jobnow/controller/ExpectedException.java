package com.jobnow.controller;

import org.springframework.http.HttpStatus;

/**
 * Created by codex on 24.01.17.
 */

public class ExpectedException extends Exception {
    private HttpStatus httpStatus;

    public ExpectedException(String message) {
        super(message);
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }

    public ExpectedException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }
}
