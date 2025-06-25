package com.benkynote.benkynote.services;

import com.benkynote.benkynote.dto.AuthUserDTO;
import com.benkynote.benkynote.dto.UserIdDTO;
import com.benkynote.benkynote.dto.UserDTO;
import com.benkynote.benkynote.dto.UserIdDTO;
import com.benkynote.benkynote.models.User;

public interface UserService extends BaseService<User, Long> {

    User createUser(User user) throws Exception;

    //User createAdministrator(UserDTO adminUserDTO) throws Exception;

    User updateUser(Long userId, UserDTO userDTO) throws Exception;

    void deactivateUser(Long userId);

    String generateRandomUsername();

    //String generatePassword();

    void syncUser(AuthUserDTO userDTO);

    Long GetBdIdFromAuth(UserIdDTO javaUserDTO);



}


  
   
