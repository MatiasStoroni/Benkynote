package com.benkynote.benkynote.repositories;

import java.util.List;
import java.util.Optional;

import com.benkynote.benkynote.models.Subject;


public interface SubjectRepository extends BaseRepository<Subject, Long>{
    Optional <Subject> findByNombreMateria(String nombreMateria);

    List <Subject> findAllByNombreMateriaIn(List <String> nombreMateria);
}