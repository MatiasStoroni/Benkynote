package com.benkynote.benkynote.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EventDTO {

    private String nombre;    
    private String descripcion;    
    private LocalDateTime fechaHoraInicio;
    private LocalDateTime fechaHoraFinal;
    
}