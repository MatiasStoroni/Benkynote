

package com.benkynote.benkynote.repositories;

import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.NoteModification;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface NoteModificationRepository extends BaseRepository<NoteModification, Long>{
    Optional<NoteModification> findFirstByNoteOrderByFechaModificacionApunteDesc(Note note);

    @Query(value = "SELECT * FROM note_modification nm WHERE nm.note_id = :noteId ORDER BY nm.fecha_modificacion_apunte DESC, nm.id DESC LIMIT 1", nativeQuery = true)
    Optional<NoteModification> findLatestModificationByNoteId(@Param("noteId") Long noteId);




}
