package com.benkynote.benkynote.controllers;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkynote.benkynote.dto.StudySessionDTO;
import com.benkynote.benkynote.enums.StudySessionState;
import com.benkynote.benkynote.models.StudySession;
import com.benkynote.benkynote.models.StudySessionCompleted;

import com.benkynote.benkynote.services.StudySessionServiceImpl;

import jakarta.persistence.EntityNotFoundException;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/users/sessions")
public class StudySessionController extends BaseControllerImpl<StudySession,StudySessionServiceImpl> {

  private StudySessionServiceImpl sessionService;

    @Autowired
    public StudySessionController(StudySessionServiceImpl sessionService) {
        this.sessionService = sessionService;
    }

    // Crear una nueva sesión de estudio
    @PostMapping("/createSession")
    public ResponseEntity<StudySession> createSession(@RequestBody Map<String, String> sessionName) {
        StudySession newSession = sessionService.createSession(sessionName.get("name"));
        return new ResponseEntity<>(newSession, HttpStatus.CREATED);
    }

    // Obtener todas las sesiones de estudio
    @GetMapping("/getAll")
    public ResponseEntity<List<StudySession>> getAllSessions() {
        List<StudySession> sessions = sessionService.getAllSessions();
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    // Obtener una sesión de estudio por ID
    @GetMapping("/{sessionId}")
    public ResponseEntity<StudySession> getSessionById(@PathVariable Long sessionId) {
        StudySession session = sessionService.getSessionById(sessionId);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    // Actualizar el estado de la sesión
    @PatchMapping("/{sessionId}/status")
    public ResponseEntity<StudySession> updateSessionStatus(
            @PathVariable Long sessionId, @RequestBody Map<String, String> status) {
        StudySessionState newStatus = StudySessionState.valueOf(status.get("status").toUpperCase());
        StudySession updatedSession = sessionService.updateSessionStatus(sessionId, newStatus);
        return new ResponseEntity<>(updatedSession, HttpStatus.OK);
    }

    // Añadir tiempo de estudio y recreo a la sesión
    @PatchMapping("/{sessionId}/add-time")
    public ResponseEntity<StudySession> addSessionTime(
            @PathVariable Long sessionId, @RequestBody Map<String, String> durations) {
        Duration duracionEstudio = Duration.ofMinutes(Long.parseLong(durations.get("estudio")));
        Duration duracionRecreo = Duration.ofMinutes(Long.parseLong(durations.get("recreo")));
        StudySession updatedSession = sessionService.addSessionTime(sessionId, duracionEstudio, duracionRecreo);
        return new ResponseEntity<>(updatedSession, HttpStatus.OK);
    }

    // Iniciar una nueva sesión de estudio
    @PostMapping("/start")
    public ResponseEntity<StudySessionDTO> startSession(@AuthenticationPrincipal Jwt jwt) {
        
        String userId  = jwt.getClaim("sub"); // Obtener la ID de Auth0 del usuario autenticado

        try {
            
            StudySession session = sessionService.startSession(userId);
        
        // Crear el DTO a partir de la entidad
            StudySessionDTO sessionDTO = new StudySessionDTO();
            sessionDTO.setId(session.getId());
            sessionDTO.setStudySessionName(session.getStudySessionName());
            sessionDTO.setStatus(session.getStatus());
            return new ResponseEntity<>(sessionDTO, HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Usuario no encontrado
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Conflicto: sesión activa
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Otros errores
        }
    }

    // Finalizar una sesión de estudio
    @PostMapping("/{sessionId}/finish")
    public ResponseEntity<StudySessionCompleted> finishSession(@PathVariable Long sessionId) {
        StudySessionCompleted completedSession = sessionService.finishSession(sessionId);
        return new ResponseEntity<>(completedSession, HttpStatus.OK);
    }
  
}
