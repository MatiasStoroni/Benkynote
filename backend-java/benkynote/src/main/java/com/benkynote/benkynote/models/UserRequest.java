package com.benkynote.benkynote.models;
//Solicitud que realiza un usuario institucional para darse de alta o baja o hacer alguna modificacion 

import com.benkynote.benkynote.enums.UserRequestState;
import com.benkynote.benkynote.enums.RequestType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "UserRequest")
@Getter
@Setter
public class UserRequest extends Base {
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRequestState estado = UserRequestState.PENDIENTE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestType tipoSolicitud;
}
