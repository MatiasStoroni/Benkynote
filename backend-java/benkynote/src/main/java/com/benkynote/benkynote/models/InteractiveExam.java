package com.benkynote.benkynote.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "InteractiveExam")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InteractiveExam extends Base{

    @Column(nullable = false)
    private String contenido;
    
}
