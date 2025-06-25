package com.benkynote.benkynote.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.benkynote.benkynote.models.Base;
import com.benkynote.benkynote.services.BaseServiceImpl;

public abstract class BaseControllerImpl<E extends Base,S extends BaseServiceImpl<E,Long>> implements BaseController<E,Long>{

	@Autowired 
	protected S servicio;
	
	@GetMapping("")
	public ResponseEntity<?> getAll(){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(servicio.findAll());
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}");		
		}
	}	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getOne(@PathVariable Long id){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(servicio.findById(id));
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
			}
		}

	@PostMapping("")
	public ResponseEntity<?> save(@RequestBody E entity){
		
		try {
			return ResponseEntity.status(HttpStatus.OK).body(servicio.save(entity));
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
			
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id,@RequestBody E entity){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(servicio.update(id,entity));
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor intente más tarde.\"}"+ e.getMessage());
			}
		}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		try {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(servicio.delete(id));
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
		}		
	}

	@DeleteMapping("/{id}/markAsDeleted")
	public ResponseEntity<Void> markAsDeleted(@PathVariable Long id) {
			try {
					servicio.markAsDeleted(id);
					return ResponseEntity.ok().build();
			} catch (Exception e) {
					return ResponseEntity.status(500).build();
			}
	}
	
	@PutMapping("/{id}/reactivate")
	public ResponseEntity<?> reactivate(@PathVariable Long id){
		try {
			servicio.reactivate(id);
			return ResponseEntity.ok().build();
		}catch (Exception e) {
			return ResponseEntity.status(500).build();	
		}
	}
	
}
