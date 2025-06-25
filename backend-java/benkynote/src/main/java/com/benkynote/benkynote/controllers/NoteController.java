package com.benkynote.benkynote.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkynote.benkynote.dto.NoteDTO;
import com.benkynote.benkynote.dto.GetOneNoteDTO;
import com.benkynote.benkynote.dto.UpdatedNoteDTO;
import com.benkynote.benkynote.enums.NoteState;
import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.NoteModification;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.services.NoteServiceImpl;
import com.benkynote.benkynote.services.UserServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/users/{userId}/notes")
public class NoteController extends BaseControllerImpl<Note, NoteServiceImpl> {

    @Autowired
    private UserServiceImpl usuarioService;

    @Autowired
    private NoteServiceImpl noteService;

    @GetMapping("/user")
    public ResponseEntity<?> getNotesByUserId(@PathVariable Long userId) throws Exception {
        try {
            User user = usuarioService.findById(userId);
            Map<String, Object> response = new HashMap<>();

            // Filtrar las notas del usuario para excluir fechaBaja distinto de null
            List<Note> notes = user.getNotes().stream()
                    .filter(note -> note.getFechaBaja() == null)
                    .collect(Collectors.toList());
            response.put("notes", notes);

            // Filtrar las notas colaboradas para excluir fechaBaja distinto de null
            List<Note> notesColaboradas = user.getNotesColaboradas().stream()
                    .filter(note -> note.getFechaBaja() == null)
                    .collect(Collectors.toList());
            response.put("notesColaboradas", notesColaboradas);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\":\"Error. Por favor intente más tarde.\"}");
        }
    }

    //----------- ESPERAR A Q LA SOL TERMINE ----------- 
    // @GetMapping("/{noteId}/getOne")
    // public ResponseEntity<GetOneNoteDTO> getOneNoteByUserId(@PathVariable Long userId, @PathVariable Long noteId)
    //         throws Exception {
    //     try {
    //         User user = usuarioService.findById(userId); // Busca al usuario por su ID
    //         Note note = user.getNotes().stream() // Busca la nota en la lista de notas del usuario
    //                 .filter(n -> n.getId().equals(noteId))
    //                 .findFirst()
    //                 .orElseThrow(() -> new Exception("Note not found"));

    //         // Construye el DTO con los datos requeridos
    //         GetOneNoteDTO noteDTO = new GetOneNoteDTO();
    //         noteDTO.setId(note.getId());
    //         noteDTO.setNombreApunte(note.getNombreApunte());
    //         noteDTO.setEtiquetaApunte(note.getEtiquetaApunte());
    //         // Obtener la última modificación (asumiendo que la lista de modificaciones está
    //         // ordenada cronológicamente)
    //         if (!note.getModifications().isEmpty()) {
    //             NoteModification lastModification = note.getModifications()
    //                     .get(note.getModifications().size() - 1);
    //             noteDTO.setContenidoApunte(lastModification.getContents().getTextoApunte());
    //         }

    //         // Llenar listas de emails y accesos de los colaboradores
    //         List<String> colaboradoresEmail = note.getCollaborations().stream()
    //                 .map(collab -> collab.getCollaborator().getEmailPrincipalUsuario())
    //                 .collect(Collectors.toList());

    //         List<String> colaboradoresAcceso = note.getCollaborations().stream()
    //                 .map(collab -> collab.getAccessType().getNombreAcceso())
    //                 .collect(Collectors.toList());

    //         noteDTO.setColaboradoresEmail(colaboradoresEmail);
    //         noteDTO.setColaboradoresAcceso(colaboradoresAcceso);

    //         return ResponseEntity.status(HttpStatus.ACCEPTED).body(noteDTO);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //     }
    // }

    @PostMapping("/createNote")
    public ResponseEntity<?> createApunte(@PathVariable Long userId, @RequestBody NoteDTO apunteDTO) {
        try {
            System.out.println("Datos recibidos: " + apunteDTO);
            Note note = noteService.createNote(userId, apunteDTO);
            NoteDTO noteDTO = new NoteDTO();
            noteDTO.setId(note.getId());
            noteDTO.setNombreApunte(note.getNombreApunte());
            noteDTO.setEtiquetaApunte(note.getEtiquetaApunte());
            noteDTO.setEsTranscripcion(note.isEsTranscripcion());
            List<String> colaboradoresEmail = note.getColab().stream()
                    .map(User::getEmailPrincipalUsuario)
                    .collect(Collectors.toList());
            noteDTO.setColaboradoresEmail(colaboradoresEmail);
            return new ResponseEntity<>(noteDTO, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST); // Devolver mensaje de
                                                                                             // error
        }
    }

    @PutMapping("/{noteId}/changeState")
    public ResponseEntity<NoteDTO> changeNoteState(@PathVariable Long noteId, @RequestBody String estado) {
        try {
            // Limpiar el String para evitar errores de formato
            estado = estado.trim().replaceAll("\"", "");
            NoteState newState = NoteState.valueOf(estado);
            Note updatedNote = noteService.changeState(noteId, newState);
            NoteDTO noteDTO = new NoteDTO();
            noteDTO.setId(updatedNote.getId());
            noteDTO.setFechaAlta(updatedNote.getFechaAlta());
            noteDTO.setFechaBaja(updatedNote.getFechaBaja());
            noteDTO.setNombreApunte(updatedNote.getNombreApunte());
            noteDTO.setEtiquetaApunte(updatedNote.getEtiquetaApunte());
            noteDTO.setUltimaModificacion(
                    updatedNote.getModifications().get(updatedNote.getModifications().size() - 1));
            // apunte actualizado y estado HTTP 200 OK
            return new ResponseEntity<>(noteDTO, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // estado no es válido,estado HTTP 400 Bad Request
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            // Si ocurre algún otro error (por ejemplo, apunte no encontrado), devolver un
            // estado HTTP 400 Bad Request
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{noteId}/updateNote")
    public ResponseEntity<?> update(@PathVariable Long noteId, @RequestBody UpdatedNoteDTO apunteNuevo) {
        try {
            NoteModification modification = noteService.updateNote(noteId, apunteNuevo);
            return ResponseEntity.status(HttpStatus.OK).body(modification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{noteId}/deleteNote")
    public ResponseEntity<?> deleteNote(@PathVariable Long noteId) {
        try {
            noteService.deleteNote(noteId);
            return ResponseEntity.ok().body("Apunte eliminado correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{noteId}/content")
    public ResponseEntity<?> updateContent(@PathVariable Long noteId, @RequestBody NoteDTO apunteNuevo) {
        try {
            NoteModification modification = noteService.createContent(noteId, apunteNuevo);
            return ResponseEntity.ok(modification); // Devuelve la modificación actualizada
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
