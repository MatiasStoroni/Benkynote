package com.benkynote.benkynote.models;

import java.util.Date;

import com.benkynote.benkynote.enums.ExamState;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ExamResolution")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExamResolution extends Base{
    
    @Column(nullable = false)
    private float calificacion;

    @Column(nullable = true)
    private Date fechaResolucionExamen;

    @Column(nullable = false)
    private Date fechaCambioEstadoExamen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id")
    @JsonBackReference("resolution-exam")
    private Exam exam; 
    
    @Enumerated(EnumType.STRING) 
    @Column(name = "exam_state")
    private ExamState estado;
}