package com.benkynote.benkynote.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InstitutionDTO {
    private String correoInstitucion;
    private String nombreInstitucion;
    private String telefonoInstitucion;
    private String sitioWeb;
    private int cuentasHabilitadas;
    private int nroEstudiantes;
    private int nroProfesores;
    private String codigoValidacion; 
    private Date fechaFinCicloInstitucion;
    private Date fechaInicioCicloInstitucion;
    private String domicilioInstitucion;
}