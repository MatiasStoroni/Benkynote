package com.benkynote.benkynote.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.benkynote.benkynote.dto.ExamDTO;
import com.benkynote.benkynote.models.Exam;
import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.services.ExamServiceImpl;
import com.benkynote.benkynote.services.NoteServiceImpl;
import com.benkynote.benkynote.services.UserServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/users/{userId}/exams")
public class ExamController extends BaseControllerImpl<Exam, ExamServiceImpl> {
    
    @Autowired
    private ExamServiceImpl examService;

    @Autowired
    private NoteServiceImpl noteService;

    @Autowired
    private UserServiceImpl usuarioService;

    @GetMapping("/user")
    public ResponseEntity<?> getExamsByUserId(@PathVariable Long userId) throws Exception {
        try {
            User user = usuarioService.findById(userId);            
            // Obtener los examenes del usuario
            List<Exam> exams = user.getExam();
            
            return ResponseEntity.status(HttpStatus.OK).body(exams);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
        }
    }

    @GetMapping("/subject")
    public ResponseEntity<?> getNoteBySubject(@PathVariable Long userId, @RequestParam String nombreMateria) throws Exception {
        try {
            User user = usuarioService.findById(userId);            
            // Obtener los apuntes del usuario
            List<Note> apuntes = noteService.findNoteBySubject(user, nombreMateria);
            
            return ResponseEntity.status(HttpStatus.OK).body(apuntes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
        }
    }
    
    @PostMapping("/createExam")
    public ResponseEntity<?> createExam(@PathVariable Long userId, @RequestBody ExamDTO examDTO) {
        try {
            User usuario= usuarioService.findById(userId);
            // Invocar el servicio para crear el examen
            Exam exam = examService.createExam(usuario, examDTO);
            return new ResponseEntity<>(exam, HttpStatus.CREATED);
        } catch (Exception e) {
            // Si ocurre un error, devolver una respuesta con el mensaje de error
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{examId}/deactivate")
    public ResponseEntity<?> deactivateExam(@PathVariable Long examId){
        try {
            Exam exam = examService.deleteExam(examId);
            return new ResponseEntity<>(exam,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

    }
}