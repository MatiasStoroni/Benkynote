package com.benkynote.benkynote.services;

import java.util.Optional;

import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.dto.AuthRoleDTO;
import com.benkynote.benkynote.dto.AuthUserDTO;
import com.benkynote.benkynote.models.Profile;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.ProfileRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



@Service
public class ProfileServiceImpl extends BaseServiceImpl<Profile, Long> implements ProfileService {

  @Autowired
  private final ProfileRepository profileRepository;

  public ProfileServiceImpl(BaseRepository<Profile, Long> baseRepository, ProfileRepository profileRepository) {
    super(baseRepository);
    this.profileRepository = profileRepository;
    
  }

  public void createRole(AuthRoleDTO roleDTO){
    

    Optional<Profile> existing_profile = profileRepository.findByNombrePerfil(roleDTO.getName());

    if(existing_profile.isPresent()){
      System.out.println("El perfil ya existe, no se creará de nuevo.");
      return;
    }

        
    Profile profile;
        
    profile = new Profile();  
    profile.setNombrePerfil(roleDTO.getName());
    profile.setDescripcionPerfil(roleDTO.getDescription());
        
    
    try {
      profileRepository.save(profile);
    } catch (Exception e) {
      throw new RuntimeException("Error al registrar el perfil: " + e.getMessage());
    }
    
        
        
    }


  @Override
  public Page findAllPageable(Pageable pageable) throws Exception {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
  }
  
}
