package com.benkynote.benkynote.services;


import java.time.Duration;
import java.util.List;

import org.springframework.web.bind.support.SessionStatus;

import com.benkynote.benkynote.models.StudySession;
import com.benkynote.benkynote.models.StudySessionCompleted;

public interface StudySessionService extends BaseService<StudySession, Long>  {
    
    StudySession createSession(String sessionName);

    List<StudySession> getAllSessions();

    StudySession getSessionById(Long sessionId);

    //StudySession updateSessionStatus(Long sessionId, SessionStatus status);

    StudySession addSessionTime(Long sessionId, Duration estudio, Duration recreo);

    StudySession startSession(String userID) throws Exception;

    StudySessionCompleted finishSession(Long sessionId);
  
}
