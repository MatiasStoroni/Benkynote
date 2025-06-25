package com.benkynote.benkynote.repositories;

import java.util.Optional;

import com.benkynote.benkynote.models.Profile;

public interface ProfileRepository extends BaseRepository<Profile, Long>{
    
    Optional<Profile> findByNombrePerfil(String nombrePerfil);  

}