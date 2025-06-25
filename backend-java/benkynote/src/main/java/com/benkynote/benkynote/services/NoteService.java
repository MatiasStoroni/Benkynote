package com.benkynote.benkynote.services;

import java.util.List;

import com.benkynote.benkynote.dto.NoteDTO;
import com.benkynote.benkynote.dto.UpdatedNoteDTO;
import com.benkynote.benkynote.enums.NoteState;
import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.NoteModification;
import com.benkynote.benkynote.models.User;

public interface NoteService extends BaseService<Note, Long> {
    Note createNote(Long idUser, NoteDTO noteDTO);
    Note changeState(Long noteId, NoteState newState);
    NoteModification updateNote(Long noteId, UpdatedNoteDTO  apunteNuevo);   
    NoteModification deleteNote (Long noteId); 
    NoteModification createContent(Long noteId, NoteDTO apunte);
    List<Note> findNoteBySubject(User usuario, String nombreMateria) throws Exception;
} 
