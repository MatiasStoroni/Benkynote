package com.benkynote.benkynote.services;

import java.io.Serializable;
import java.util.List;
import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import com.benkynote.benkynote.models.Base;

public interface BaseService<E extends Base, ID extends Serializable>{

    List<E> findAll() throws Exception;
    Page findAllPageable(Pageable pageable) throws Exception;
    E findById(ID id) throws Exception;
    E save(E entity) throws Exception;
    E update(ID id, E entity) throws Exception;
    boolean delete(ID id) throws Exception;
    boolean markAsDeleted(ID id) throws Exception;
    void reactivate(ID id) throws Exception;
    
}