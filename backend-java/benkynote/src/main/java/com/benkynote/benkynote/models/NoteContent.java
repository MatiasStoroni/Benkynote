package com.benkynote.benkynote.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "NoteContent")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NoteContent extends Base {
    
    @Lob
    @Column(nullable = true, columnDefinition = "LONGTEXT")
    private String textoApunte;

    @OneToMany(mappedBy = "comentarioApunte", cascade = {CascadeType.ALL}, orphanRemoval = true)
    @JsonManagedReference("content-comment")
    private List<Comment> comentarios = new ArrayList<>();
}
