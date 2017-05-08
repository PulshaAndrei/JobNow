package com.jobnow.controller;

import com.jobnow.entity.Device;
import com.jobnow.repository.DevicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by codex on 06.02.17.
 */
@CrossOrigin(origins = "*")
@Controller
public class DevicesController {

    @Value("${token.key}")
    private String tokenKey;

    @Autowired
    @Qualifier("devicesRepository")
    private DevicesRepository devicesRepository;

    @RequestMapping(value = "/devices", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addDeviceToken(@RequestHeader(value = "Authorization") String token, @RequestBody Device device) throws ExpectedException {
        int id = (int) Authorization.getUserId(token, tokenKey);
        device.setUserId(id);
        devicesRepository.create(device);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value = "/devices", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> removeDeviceToken(@RequestHeader(value = "Authorization") String token, @RequestBody Device device) throws ExpectedException {
        int id = (int) Authorization.getUserId(token, tokenKey);
        device.setUserId(id);
        devicesRepository.delete(device);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
