package com.benkynote.benkynote.models;

import java.time.Duration;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "StudySessionTime")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudySessionTime extends Base {
  
  private Duration duracionEstudio;
  private Duration duracionRecreo;

  @OneToOne(mappedBy = "sessionTime")
  private StudySession studySession;


}
