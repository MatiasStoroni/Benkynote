package com.benkynote.benkynote.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthUsersPaginationDTO {
    private int total; // El total de usuarios
    private int start;
    private int limit;
    private AuthUserDTO[] users; // Array de usuarios

}
