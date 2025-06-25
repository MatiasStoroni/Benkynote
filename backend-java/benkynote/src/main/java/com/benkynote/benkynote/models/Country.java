package com.benkynote.benkynote.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Country")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Country extends Base{
    @Column(nullable = false)
    private String nombrePais;

    @Column(nullable = false)
    private float nivelAlfabetismo;

    @Column(nullable = false)
    private float nivelEgresadosSecundarioPais;

    @Column(nullable = false)
    private int poblacionEstimadaPais;
}