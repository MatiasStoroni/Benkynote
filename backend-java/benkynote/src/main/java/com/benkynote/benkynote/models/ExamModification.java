package com.benkynote.benkynote.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.benkynote.benkynote.enums.ExamTime;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
@Table(name = "ExamModification")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExamModification extends Base {
    
    @Column(nullable = false)
    private Date fechaModificacionExamen;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id")
    @JsonBackReference("modifications-exam")
    private Exam exam;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "note_exam", 
        joinColumns = @JoinColumn(name = "exam_id"), 
        inverseJoinColumns = @JoinColumn(name = "note_id") 
    )
    @JsonIgnore
    private List<Note> apuntes;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_structure_id")
    @JsonBackReference("modifications-structure")
    private ExamStructure estructura;

    @OneToOne(cascade = CascadeType.ALL)
    private InteractiveExam contenidoExamen;

    @Enumerated(EnumType.STRING) 
    @Column(name = "duration_exam")
    private ExamTime duracion;
}

