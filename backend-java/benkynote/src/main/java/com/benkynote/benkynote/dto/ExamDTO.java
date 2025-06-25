package com.benkynote.benkynote.dto;

import java.util.List;

import com.benkynote.benkynote.enums.ExamTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamDTO {
    private String nombreExamen;
    private String descripcionExamen;
    private List <String> materia;
    private Long estructuraId; 
    private List<Long> apuntesIds;
    private ExamTime duracion; 
    private String contenidoExamen;
}

