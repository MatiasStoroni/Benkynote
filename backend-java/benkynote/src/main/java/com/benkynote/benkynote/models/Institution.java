package com.benkynote.benkynote.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.benkynote.benkynote.enums.InstitutionState;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Institution")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Institution extends Base {

    @Column(nullable = false, unique = true)
    private String correoInstitucion;
    
    @Column(nullable = false)
    private String nombreInstitucion;
    
    @Column(nullable = false)
    private String telefonoInstitucion;
    
    @Column(nullable = true)
    private String sitioWeb;

    @Column(nullable = true)
    private int cuentasHabilitadas;

    @Column(nullable = true)
    private int nroEstudiantes;
    
    @Column(nullable = true)
    private int nroProfesores;

    @Column(nullable = true)
    private String codigoValidacion; // Código de validación si no hay dominio

    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    private Date fechaFinCicloInstitucion;
    
    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    private Date fechaInicioCicloInstitucion;

    @Column(nullable = true)
    private String domicilioInstitucion; 
    // Calle y numeración

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InstitutionState estado = InstitutionState.HABILITADO;

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "localidad_id")
    private City localidad;

    public String getDominio() {
        if (correoInstitucion != null && correoInstitucion.contains("@")) {
            return correoInstitucion.substring(correoInstitucion.indexOf('@') + 1).toLowerCase();
        }
        return null;
    }
}