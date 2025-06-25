package com.benkynote.benkynote.repositories;

import java.util.List;
import java.util.Optional;

import com.benkynote.benkynote.enums.UserState;
import com.benkynote.benkynote.models.User;


public interface UserRepository extends BaseRepository<User, Long>{  
    Optional<List<User>> findByEmailPrincipalUsuarioIn(List<String> emailPrincipalUsuarios); //varios usuarios
    User findByUsuario(String usuario);
    User findByEmailPrincipalUsuario(String email); //un usuario
    List<User> findByEstado(UserState pendienteDeBaja);
    Optional<User> findByAuth0Id(String auth0Id);
    //Optional<User> findByUsername(String username);

    //boolean existsByEmail(String email);
}