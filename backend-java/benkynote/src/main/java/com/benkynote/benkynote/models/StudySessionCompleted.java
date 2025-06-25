package com.benkynote.benkynote.models;

import java.time.Duration;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "StudySessionCompleted")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudySessionCompleted extends Base {
  
  private Duration totalEstudio;
  private Duration totalRecreo;
  private Duration totalSesion;

  @ManyToOne
  @JoinColumn(name = "sesion_id", nullable = false)
  private StudySession session; // Referencia a la sesión

}

