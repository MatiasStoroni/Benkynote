package com.benkynote.benkynote.controllers;

import java.io.Serializable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import com.benkynote.benkynote.models.Base;

public interface BaseController<E extends Base, ID extends Serializable>  {
    public ResponseEntity<?> getAll();
    public ResponseEntity<?> getOne(@PathVariable ID id );
    public ResponseEntity<?> save(@RequestBody E entity);
    public ResponseEntity<?> update(@PathVariable ID id , @RequestBody E entity);
    public ResponseEntity<?> delete(@PathVariable ID id);
    public ResponseEntity<?> markAsDeleted(@PathVariable ID id);
    public ResponseEntity<?> reactivate(@PathVariable ID id); 

}
