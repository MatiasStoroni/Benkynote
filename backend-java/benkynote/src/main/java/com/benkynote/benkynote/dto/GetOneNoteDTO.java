package com.benkynote.benkynote.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetOneNoteDTO {

    private Long id;
    private String nombreApunte;
    private String etiquetaApunte;
    private String contenidoApunte;
    private List<String> colaboradoresEmail;
    private List<String> colaboradoresAcceso;

}