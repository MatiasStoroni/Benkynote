package com.benkynote.benkynote.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkynote.benkynote.models.Comment;
import com.benkynote.benkynote.services.CommentServiceImpl;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/users/{userId}/notes/{noteId}")
public class CommentController extends BaseControllerImpl <Comment, CommentServiceImpl> {
    
    @Autowired
    private CommentServiceImpl commentService;

    @PostMapping("/createComment")
    public ResponseEntity<?> createComment(@PathVariable Long userId, @PathVariable Long noteId, @RequestBody String comentarioTexto) throws Exception {
        try {
            Comment comentario = commentService.createComment(comentarioTexto, userId, noteId);
            return new ResponseEntity<>(comentario, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{commentId}/response")
    public ResponseEntity<Comment> respondComment(
            @PathVariable Long commentId, 
            @PathVariable Long userId,
            @RequestBody Map<String, String> request) {
        try {
            String respuesta = request.get("respuesta");
            if (respuesta == null || respuesta.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Si la respuesta está vacía o nula
            }

            // Llamada al servicio para responder el comentario
            Comment updatedComment = commentService.respondComment(commentId, userId, respuesta);

            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el comentario
        }
    }


}
