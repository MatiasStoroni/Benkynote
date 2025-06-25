package com.benkynote.benkynote.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkynote.benkynote.models.Profile;
import com.benkynote.benkynote.security.AuthService;
import com.benkynote.benkynote.services.ProfileServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/roles")
public class Profile_Controller extends BaseControllerImpl<Profile, ProfileServiceImpl>  {

  
  @Autowired
  private ProfileServiceImpl ProfileService;

  @Autowired 
  private AuthService authService;

  @GetMapping("/auth")
	public ResponseEntity<?> fetchAuthRoles(){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(authService.fetchRoles());
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
			
		}
	}  

	@PostMapping("/create")
	public ResponseEntity<?> createRoles() {
		try {
			authService.createAuthRoles();
			return ResponseEntity.ok().build();
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
			
		}
		
		
	}
	


  
  


  
}
