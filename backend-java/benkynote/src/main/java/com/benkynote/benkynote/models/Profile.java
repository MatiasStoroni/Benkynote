package com.benkynote.benkynote.models;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Profile")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Profile extends Base {
    
    @Column(nullable = false)
    private String nombrePerfil;
    
    @Column(nullable = false)
    private String descripcionPerfil;
    
    @ManyToMany(mappedBy = "profiles")
    private Set<User> users = new HashSet<>();


    @ManyToMany
    @JoinTable(
        name = "ProfilePermission", // Nombre de la tabla intermedia
        joinColumns = @JoinColumn(name = "idPerfil"), // Columna que hace referencia a Perfil
        inverseJoinColumns = @JoinColumn(name = "idPermiso") // Columna que hace referencia a Permiso
    )
    private Set<Permission> permisos = new HashSet<>();

}
