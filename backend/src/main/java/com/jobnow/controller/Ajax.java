package com.jobnow.controller;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Andrei on 27.11.2016.
 */

public class Ajax {

    public static Map<String, Object> successResponse(String propertyName, Object object) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", "success");
        response.put(propertyName, object);
        return response;
    }

    public static Map<String, Object> emptyResponse() {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", "success");
        response.put("message", "ok");
        return response;
    }

    public static Map<String, Object> errorResponse(Exception e) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", "error");
        if (e.getCause() == null) {
            response.put("message", "Unknown error: " + e.getMessage());
        }
        else if (e.getCause().getMessage().equals("userDataWrong")) {
            response.put("message", e.getMessage());
        }
        else if (e.getCause().getMessage().equals("authError")) {
            response.put("message", "Authorization error: " + e.getMessage());
        }
        else {
            response.put("message", "Server error: " + e.getMessage());
        }
        return response;
    }
}