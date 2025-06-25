package com.benkynote.benkynote.dto;

import java.util.Date;

import com.benkynote.benkynote.enums.UserState;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String auth0Id;
    private Long Id;
    private String usuario;
    private String nombreUsuario;
    private String apellidoUsuario;
    private String domicilioUsuario;
    private String emailUsuario;
    private String telefonoUsuario;
    private Date fechaNacUsuario;
    private UserState estado;
}
