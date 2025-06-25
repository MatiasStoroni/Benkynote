package com.benkynote.benkynote.models;


import java.util.Date;

import com.benkynote.benkynote.enums.NoteState;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "NoteModification")
@Getter
@Setter
public class NoteModification extends Base {

    @Column(nullable = false)
    private Date fechaModificacionApunte;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    @JsonBackReference("modifications-note")
    private Note note;

    @OneToOne(cascade = CascadeType.ALL)
    private NoteContent contents;

    @Enumerated(EnumType.STRING)
    private NoteState state;
}
