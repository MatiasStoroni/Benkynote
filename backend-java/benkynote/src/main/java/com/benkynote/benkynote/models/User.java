package com.benkynote.benkynote.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.benkynote.benkynote.enums.UserState;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference; 

@Entity
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User extends Base {
    
    @Column
    private String auth0Id;

    @Column(nullable = false)
    private String usuario;
    
    @Column(nullable = false)
    private String nombreUsuario;
    
    @Column(nullable = false)
    private String apellidoUsuario;
   
    @Column(nullable = true)
    private String domicilioUsuario; // Calle y numeración

    @Column(nullable = false, unique = true)
    private String emailPrincipalUsuario;
    
    @Column(nullable = true, unique = true)
    private String emailSecundarioUsuario;

    @Column(nullable=true, unique = true)
    private String emailInstitucional;

    @Column
    private Boolean institucion_verificada = false;

    @Column(nullable = true)
    private String passwordUsuario;
    
    @Column(nullable = true)
    private String telefonoUsuario;
    
    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    private Date fechaNacUsuario;

    //String imagenUsuario;

    //-----------------ESTADOS--------------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserState estado = UserState.HABILITADO;

    //-----------------RELACIONES-----------------------

    @ManyToOne
    @JoinColumn(name = "localidad_id")
    private City localidad;

    @ManyToMany (fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_profile",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "profile_id")
    )
    private Set<Profile> profiles = new HashSet<>();

   
    @ManyToOne
    @JoinColumn(name = "institution_id", nullable = true)
    private Institution institution;  
    
    @OneToMany(mappedBy = "user")
    @JsonManagedReference("user-note")
    private List<Note> notes;
    
    @ManyToMany(mappedBy = "colab", fetch = FetchType.LAZY)  
    @JsonIgnore
    private List<Note> notesColaboradas;  

    @OneToOne
    private Calendar calendario;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "study_session_id", referencedColumnName = "id")
    @JsonManagedReference("user-studySession") 
    private StudySession studySession;

    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-comments")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "autorRespuesta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-Respuestas")
    private List<CommentResponse> responses = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @JsonManagedReference("user-exam")
    private List<Exam> exam;
}
 