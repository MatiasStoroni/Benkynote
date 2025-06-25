package com.benkynote.benkynote.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Exam")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Exam extends Base {
    @Column(nullable = false)
    private String nombreExamen;

    @Column(nullable = false)
    private String descripcionExamen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference ("user-exam")
    private User user;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("modifications-exam")
    private List<ExamModification> examModifications = new ArrayList<>();

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("resolution-exam")
    private List<ExamResolution> resultado = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "subject_exam", 
        joinColumns = @JoinColumn(name = "exam_id"), 
        inverseJoinColumns = @JoinColumn(name = "subject_id") 
    )
    @JsonIgnore
    private List<Subject> materia;
}