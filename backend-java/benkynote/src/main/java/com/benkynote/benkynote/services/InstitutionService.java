package com.benkynote.benkynote.services;

import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;

import com.benkynote.benkynote.models.Institution;

public interface InstitutionService extends BaseService <Institution, Long> {
  
  Page findAllPageable(Pageable pageable) throws Exception ;
    
}
