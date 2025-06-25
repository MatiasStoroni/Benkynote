package com.benkynote.benkynote.security;


import com.benkynote.benkynote.dto.AuthRoleDTO;
import com.benkynote.benkynote.dto.AuthUserDTO;
import com.benkynote.benkynote.dto.AuthUsersPaginationDTO;
import com.benkynote.benkynote.services.ProfileServiceImpl;
import com.benkynote.benkynote.services.UserServiceImpl;



import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {

    // @Value("${auth0.audience}")
    // private String audience;

    // @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    // private String issuer;

    // @Value("${web.cors.allowed-origins}")
    // private String corsAllowedOrigins;

   // private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private ProfileServiceImpl profileServiceImpl;

    // public AuthService(UserRepository userRepository, UserServiceImpl userServiceImpl){
    //     //this.userRepository=userRepository;
    //     this.userServiceImpl=userServiceImpl;

    // }

 
    public String getManagementApiToken() {
        String url = "https://dev-duepkhvu0ec2vxgd.us.auth0.com/oauth/token";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("client_id", "REDACTED");
        body.put("client_secret", "REDACTED");//Hay que poner todas estas cosas en una varible de ent
        body.put("audience", "https://dev-duepkhvu0ec2vxgd.us.auth0.com/api/v2/");
        body.put("grant_type", "client_credentials");

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        String token = (String) response.getBody().get("access_token");

        return token;
    }


    public AuthUserDTO fetchUser(String userId, String token) {

        //String encodedUserId = URLEncoder.encode(userId, StandardCharsets.UTF_8);

        String url = "https://dev-duepkhvu0ec2vxgd.us.auth0.com/api/v2/users/" + userId.toString();

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Accept", "application/json");

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<AuthUserDTO> response = restTemplate.exchange(
            url, HttpMethod.GET, requestEntity, AuthUserDTO.class
        );

        return response.getBody();
        
    }

    public List<AuthUserDTO> fetchUsers() throws Exception{

        String token = getManagementApiToken();

        // URL para obtener todos los usuarios
        String url = "https://dev-duepkhvu0ec2vxgd.us.auth0.com/api/v2/users";

        // Crea una instancia de RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Configura los headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Accept", "application/json");

        // Crea la solicitud con headers
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        // Realiza la solicitud GET y mapea la respuesta a un array de AuthUserDTO
        ResponseEntity<AuthUserDTO[]> response = restTemplate.exchange(
            url, HttpMethod.GET, requestEntity, AuthUserDTO[].class
        );

        // Convierte el array a una lista y la retorna
        return Arrays.asList(response.getBody());
    
    }

    public AuthUsersPaginationDTO fetchUsersPagination(int page, int pageSize) throws Exception{

        String token = getManagementApiToken();

        // URL para obtener todos los usuarios
        // URL para obtener todos los usuarios con el total
        String url = String.format("https://dev-duepkhvu0ec2vxgd.us.auth0.com/api/v2/users?page=%d&per_page=%d&include_totals=true", page, pageSize);

        // Crea una instancia de RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Configura los headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Accept", "application/json");

        // Crea la solicitud con headers
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        // Realiza la solicitud GET y mapea la respuesta a un array de AuthUserDTO
        ResponseEntity<AuthUsersPaginationDTO> response = restTemplate.exchange(
        url, HttpMethod.GET, requestEntity, AuthUsersPaginationDTO.class
    );

        
        return response.getBody();      
    }


    public boolean deleteUserFromAuth0(String userId) throws Exception {
        String token = getManagementApiToken();
        String url = String.format("https://dev-duepkhvu0ec2vxgd.us.auth0.com/api/v2/users/%s", userId);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.DELETE, requestEntity, String.class
            );
            return true;
        } catch (HttpClientErrorException e) {
            // Manejo de errores más específico
            throw new Exception("Error2 eliminando usuario de Auth0: " + e.getStatusCode() + " - " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            // Captura de otros errores
            throw new Exception("Error3 inesperado al eliminar usuario de Auth0: " + e.getMessage(), e);
        }
    }


    //ahora hay que usar lo de arriba para crear los usuarios.

    public void syncUsers() throws Exception{
        List<AuthUserDTO> users = fetchUsers();
        for(AuthUserDTO authUserDTO: users){
                userServiceImpl.syncUser(authUserDTO);
        }
    }

    public List<AuthRoleDTO> fetchRoles() throws Exception{
        String token = getManagementApiToken();

        String url = "https://dev-duepkhvu0ec2vxgd.us.auth0.com/api/v2/roles";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Accept","application/json");
        
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<AuthRoleDTO[]> response = restTemplate.exchange(
            url, HttpMethod.GET, requestEntity, AuthRoleDTO[].class

        );

        return Arrays.asList(response.getBody());

    }

    public void createAuthRoles() throws Exception{
        List<AuthRoleDTO> roles = fetchRoles();
        for(AuthRoleDTO authRoleDTO : roles){
            profileServiceImpl.createRole(authRoleDTO);
            
        }
    }



    








  
}
