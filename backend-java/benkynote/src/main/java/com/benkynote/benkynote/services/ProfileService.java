package com.benkynote.benkynote.services;

import com.benkynote.benkynote.dto.AuthRoleDTO;
import com.benkynote.benkynote.models.Profile;


public interface ProfileService extends BaseService<Profile, Long> {
  void createRole(AuthRoleDTO roleDTO);
}
