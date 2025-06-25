package com.benkynote.benkynote.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Subject")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Subject extends Base{
    @Column(nullable = false)
    private String nombreMateria;

    @Column(nullable = false)
    private String descripcionMateria;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("subjet-note")
    private List<Note> notes;
}