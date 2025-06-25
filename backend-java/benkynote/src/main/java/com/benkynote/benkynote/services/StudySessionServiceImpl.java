package com.benkynote.benkynote.services;


import java.lang.StackWalker.Option;
import java.time.Duration;
import java.util.List;
import java.util.Optional;

import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.server.ResponseStatusException;

import com.benkynote.benkynote.enums.StudySessionState;
import com.benkynote.benkynote.models.Profile;
import com.benkynote.benkynote.models.StudySession;
import com.benkynote.benkynote.models.StudySessionCompleted;
import com.benkynote.benkynote.models.StudySessionTime;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.ProfileRepository;
import com.benkynote.benkynote.repositories.StudySessionCompletedRepository;
import com.benkynote.benkynote.repositories.StudySessionRepository;
import com.benkynote.benkynote.repositories.StudySessionTimeRepository;
import com.benkynote.benkynote.repositories.SubjectRepository;
import com.benkynote.benkynote.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
public class StudySessionServiceImpl extends BaseServiceImpl<StudySession, Long> implements StudySessionService {
  
  @Autowired
  private final StudySessionRepository sessionRepository;
  private final StudySessionTimeRepository timeRepository;
  private final StudySessionCompletedRepository completedRepository;

  private final UserRepository userRepository;

  public StudySessionServiceImpl(BaseRepository<StudySession, Long> baseRepository, StudySessionRepository sessionRepository, 
  StudySessionTimeRepository timeRepository, StudySessionCompletedRepository completedRepository, UserRepository userRepository) {
    super(baseRepository);
    this.sessionRepository = sessionRepository;
    this.timeRepository = timeRepository;
    this.completedRepository = completedRepository;
    this.userRepository = userRepository;
  }



    // Crear una nueva sesión de estudio
    public StudySession createSession(String sessionName) {

      if (sessionName.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de la sesión no puede estar vacío o ser nulo.");
      }
        StudySession session = new StudySession();
        session.setStudySessionName(sessionName);
        //session.setStatus(StudySessionState.HABILITADA); // Sesión csomienza habilitada
        session.setTotalEstudio(Duration.ZERO);
        session.setTotalRecreo(Duration.ZERO);
        session.setTotalSesion(Duration.ZERO);
        return sessionRepository.save(session);
    }

    // Obtener todas las sesiones de estudio
    public List<StudySession> getAllSessions() {
        return sessionRepository.findAll();
    }

    // Obtener una sesión de estudio por ID
    public StudySession getSessionById(Long sessionId) {
        return sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Sesión no encontrada"));
    }

    // Actualizar el estado de la sesión
   
    public StudySession updateSessionStatus(Long sessionId, StudySessionState status) {
        StudySession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Sesión no encontrada"));
        session.setStatus(status);
        return sessionRepository.save(session);
    }

    // Agregar tiempos de estudio y recreo
    public StudySession addSessionTime(Long sessionId, Duration estudio, Duration recreo) {
      // Busca la sesión por su ID
      StudySession session = sessionRepository.findById(sessionId)
              .orElseThrow(() -> new IllegalArgumentException("Sesión no encontrada"));
  
      // Si ya existe un StudySessionTime asociado, lo actualizamos, si no, creamos uno nuevo
     
     
      StudySessionTime sessionTime = session.getSessionTime();
      if (sessionTime == null) {
          StudySessionTime sessionTimeNew = new StudySessionTime();
          sessionTimeNew.setDuracionEstudio(estudio);
          sessionTimeNew.setDuracionRecreo(recreo);
          session.setSessionTime(sessionTime); // Establecemos el tiempo en la sesión
      } else {
          sessionTime.setDuracionEstudio(estudio);
          sessionTime.setDuracionRecreo(recreo);
      }
  
      // Guardamos el tiempo de sesión
      timeRepository.save(sessionTime);
  
      // Guardamos la sesión con el nuevo tiempo asociado
      return sessionRepository.save(session);
  }


    public StudySession startSession(String userId) throws Exception{
      
      Optional<User> user = userRepository.findByAuth0Id(userId);
      
      if (!user.isPresent()) {
        throw new EntityNotFoundException("No user found with Auth0 ID: " + userId);
      }
      
      User realuser = user.get();

      StudySession session = realuser.getStudySession();

      if (session == null) { //esta verificación no se si es necesaria
        session = new StudySession();
        session.setUser(realuser);  // Asocia la sesión con el usuario
    } else {
        // Si ya tiene una sesión, verifica el estado
        if (session.getStatus() == StudySessionState.HABILITADA) {
            throw new IllegalStateException("User already has an active study session."); //estotal vez si es necesario
        }
    }

      session.setStatus(StudySessionState.HABILITADA);

      try {
        sessionRepository.save(session);
        return session;
      } catch (Exception e) {
        throw new Exception("Failed to start study session: " + e.getMessage(), e);
      }

    }

    // Finalizar sesión y calcular tiempos totales
    public StudySessionCompleted finishSession(Long sessionId) {
      // Buscar la sesión por su ID
      StudySession session = sessionRepository.findById(sessionId)
              .orElseThrow(() -> new IllegalArgumentException("Sesión no encontrada"));
  
      // Obtener el tiempo asociado a la sesión
      StudySessionTime sessionTime = session.getSessionTime();
      if (sessionTime == null) {
          throw new IllegalArgumentException("No se encontró tiempo de sesión asociado");
      }
  
      // Obtener las duraciones de estudio y recreo directamente
      Duration totalEstudio = sessionTime.getDuracionEstudio();
      Duration totalRecreo = sessionTime.getDuracionRecreo();
      Duration totalSesion = totalEstudio.plus(totalRecreo);
  
      // Crear el registro de la sesión completada
      StudySessionCompleted sessionCompleted = new StudySessionCompleted();
      sessionCompleted.setSession(session);
      sessionCompleted.setTotalEstudio(totalEstudio);
      sessionCompleted.setTotalRecreo(totalRecreo);
      sessionCompleted.setTotalSesion(totalSesion);
  
      // Actualizar el estado de la sesión como deshabilitada
      session.setStatus(StudySessionState.DESHABILITADA);
  
      // Guardar el registro de la sesión completada y actualizar la sesión
      completedRepository.save(sessionCompleted);
      sessionRepository.save(session);
  
      return sessionCompleted;
  }


  

   @Override
    public Page findAllPageable(Pageable pageables) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
    }


}
