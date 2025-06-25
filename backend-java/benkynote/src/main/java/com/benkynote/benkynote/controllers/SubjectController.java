package com.benkynote.benkynote.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkynote.benkynote.models.Subject;
import com.benkynote.benkynote.services.SubjectServiceImpl;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/subjects")
public class SubjectController extends BaseControllerImpl<Subject, SubjectServiceImpl> {
  
    
}
