package com.benkynote.benkynote.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkynote.benkynote.models.Calendar;

import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.services.UserServiceImpl;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/users/{userId}/calendar")
public class CalendarController {

    @Autowired
    private UserServiceImpl usuarioService;

    
    @GetMapping
    public ResponseEntity<?> getCalendarByUserId(@PathVariable Long userId) throws Exception {
        try {
            User usuario = usuarioService.findById(userId);
            Calendar calendario = usuario.getCalendario();
            return ResponseEntity.status(HttpStatus.OK).body(calendario);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

}