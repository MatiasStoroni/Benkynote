package com.benkynote.benkynote.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdatedNoteDTO {

    private String nombreApunte;
    private String etiquetaApunte;
    private List<String> colaboradoresEmail;

}