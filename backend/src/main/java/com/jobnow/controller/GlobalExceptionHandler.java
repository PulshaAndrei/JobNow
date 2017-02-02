package com.jobnow.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by codex on 24.01.17.
 */
@EnableWebMvc
@RestController
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ExpectedException.class)
    public void handleException(ExpectedException e, HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setStatus(e.getHttpStatus().value());
        response.sendError(e.getHttpStatus().value(), e.getMessage());
    }
}