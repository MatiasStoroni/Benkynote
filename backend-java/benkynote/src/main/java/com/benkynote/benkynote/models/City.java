package com.benkynote.benkynote.models;

import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "City")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class City extends Base {
    @Column(nullable = false)
    private String nombreLocalidad;

    @ManyToOne
    @JoinColumn(name = "provincia_id")
    private Province provincia;
}