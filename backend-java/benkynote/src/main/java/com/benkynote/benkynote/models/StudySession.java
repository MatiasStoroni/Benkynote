package com.benkynote.benkynote.models;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import com.benkynote.benkynote.enums.StudySessionState;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "StudySession")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudySession extends Base {
  
  private String studySessionName;

 
  @Enumerated(EnumType.STRING)
  private StudySessionState status = StudySessionState.DESHABILITADA;

 
  @OneToOne(mappedBy = "studySession")
  @JsonBackReference("user-studySession")
  private User user;


  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "study_session_time_id", referencedColumnName = "id")
  private StudySessionTime sessionTime;


  @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<StudySessionCompleted> sessionsCompleted = new ArrayList<>();

  private Duration totalEstudio = Duration.ZERO;
  private Duration totalRecreo = Duration.ZERO;
  private Duration totalSesion = Duration.ZERO;


  
}
