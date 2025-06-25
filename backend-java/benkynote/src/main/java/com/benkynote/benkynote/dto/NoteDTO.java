package com.benkynote.benkynote.dto;


import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.benkynote.benkynote.models.NoteModification;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NoteDTO {

    private Long id;
    private Date fechaAlta;
    private Date fechaBaja;
    private String nombreApunte;
    private String etiquetaApunte;
    private boolean esTranscripcion;
    private String contenidoApunte;
    private String nombreMateria;
    private List<String> colaboradoresEmail;
    private NoteModification ultimaModificacion;

}