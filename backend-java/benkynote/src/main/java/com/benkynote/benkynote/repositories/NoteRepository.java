package com.benkynote.benkynote.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.Subject;
import com.benkynote.benkynote.models.User;

public interface NoteRepository extends BaseRepository<Note, Long> {

   Optional<Note> findByNombreApunteAndUser(String nombreApunte, User propietario);

   Optional<Note> findByIdAndFechaBajaIsNull(Long noteId);

   List<Note> findByUserAndSubject(User usuario, Subject materia);
}

    
