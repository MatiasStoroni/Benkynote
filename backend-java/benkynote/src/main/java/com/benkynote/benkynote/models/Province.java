package com.benkynote.benkynote.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Province")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Province extends Base{
    @Column(nullable = false)
    private String nombreProvincia;

    @Column(nullable = false)
    private float nivelEgresadosSecundarioProv;

    @Column(nullable = false)
    private int poblacionEstimadaProvincia;

    @ManyToOne
    @JoinColumn(name = "pais_id")
    private Country pais;
}