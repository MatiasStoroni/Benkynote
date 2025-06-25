package com.benkynote.benkynote.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "Permission")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Permission extends Base {

  @Column(nullable = false)
  private String nombrePermiso;
  
  @Column(nullable = false)
  private String descripcionPermiso;

  @ManyToMany(mappedBy = "permisos")
    private Set<Profile> perfiles = new HashSet<>();


  
}
