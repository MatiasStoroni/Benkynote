package com.benkynote.benkynote.services;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import com.benkynote.benkynote.models.Base;
import com.benkynote.benkynote.models.Institution;
import com.benkynote.benkynote.repositories.BaseRepository;

import jakarta.transaction.Transactional;

public abstract class BaseServiceImpl <E extends Base, ID extends Serializable> implements BaseService<E, ID> {

    protected final BaseRepository<E, ID> baseRepository;

    public BaseServiceImpl(BaseRepository<E, ID> baseRepository) {
        this.baseRepository = baseRepository;
    }

    @Override
    @Transactional
    public List<E> findAll() throws Exception {
        try{
            List<E> entities = baseRepository.findAll();
            return entities;
        }
        catch (Exception e){
            System.out.println("a");
            throw new Exception(e.getMessage());
        }
    }

/*    @Override
    @Transactional
    public Page findAllPageable(Pageable pageable) throws Exception {
        try{
            Page entities = baseRepository.findAll(pageable);
            return entities;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }*/

    @Override
    @Transactional
    public E findById(ID id) throws Exception {
        try{
            Optional<E> entityOptional = baseRepository.findById(id);
            return entityOptional.orElseThrow(() -> new Exception("Entity not found"));
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public E save(E entity) throws Exception {
        try{
            entity = baseRepository.save(entity);
            return entity;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public E update(ID id, E entity) throws Exception {
        try {
            if (!baseRepository.existsById(id)) {
                throw new Exception("Entity not found");
            }
            return baseRepository.save(entity);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
    
    @Override
    @Transactional
    public boolean delete(ID id) throws Exception{
        try{
            if (baseRepository.existsById(id)){
                baseRepository.deleteById(id);
                return true;
            }else {
                throw new Exception();
            }
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public boolean markAsDeleted(ID id) throws Exception {
        try {
            Optional<E> entityOptional = baseRepository.findById(id);
            if (entityOptional.isPresent()) {
                E entity = entityOptional.get();
                entity.markAsDeleted();
                baseRepository.save(entity);
                return true;
            } else {
                throw new Exception("Entity not found");
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void reactivate(ID id) throws Exception{
        try {
            Optional<E> entityOptional = baseRepository.findById(id);
            if (entityOptional.isPresent()) {
                E entity = entityOptional.get();
                entity.setFechaBaja(null);
                baseRepository.save(entity);
            } else {
                throw new Exception("Entity not found");
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}