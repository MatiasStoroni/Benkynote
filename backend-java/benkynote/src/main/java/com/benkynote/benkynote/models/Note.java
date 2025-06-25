package com.benkynote.benkynote.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Note")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Note extends Base {

    @Column(nullable = false)
    private String nombreApunte;

    @Column(nullable = true)
    private String etiquetaApunte;

    @Column(nullable = true)
    private boolean esTranscripcion;

    // -----------------RELACIONES-----------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-note")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "note_access", // Colaboradores
            joinColumns = @JoinColumn(name = "note_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private List<User> colab;

    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("modifications-note")
    private List<NoteModification> modifications = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    @JsonBackReference("subjet-note")
    private Subject subject;
    
}
