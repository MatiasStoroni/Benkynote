package com.benkynote.benkynote.controllers;

import java.util.List;
//import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.benkynote.benkynote.controllers.UserController;
import com.benkynote.benkynote.dto.AuthUserDTO;
import com.benkynote.benkynote.dto.UserIdDTO;
import com.benkynote.benkynote.dto.UserDTO;
//import com.benkynote.benkynote.dto.UserIdDTO;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.security.AuthService;
import com.benkynote.benkynote.services.UserServiceImpl;

import jakarta.persistence.EntityNotFoundException;
//import jakarta.validation.Valid;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/users")
public class UserController extends BaseControllerImpl<User, UserServiceImpl>{
    
    @Autowired
    private UserServiceImpl userService;

    @Autowired 
    private AuthService authService;

    /*
    @PutMapping("/{userId}/calendar")
    public ResponseEntity<?> addCalendar(@PathVariable Long userId){
        try{
            userService.addCalendar(userId);
            return ResponseEntity.status(HttpStatus.CREATED).body("created");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
        }
    }
    
    Registro de usuario
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
         }
         try {          
             User nuevoUsuario = userService.createUser(userDTO);            
             return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
         } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
         }
     }
    
    Registro de administrador de institución
    @PostMapping("/admin/signup") //ver el endpoint con el frontend
    public ResponseEntity<?> registerAdministrator(@Valid @RequestBody UserDTO adminDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        try {
            User nuevoAdmin = userService.createAdministrator(adminDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
        }
    }
    
    */

    @GetMapping("")
	public ResponseEntity<?> getAll(){
		try {
            List <User> users = userService.findAll();
            // Convertimos cada User a UserDTO
            List<UserDTO> userDTOs = users.stream().map(user -> new UserDTO(
                    user.getAuth0Id(),
                    user.getId(),
                    user.getUsuario(),
                    user.getNombreUsuario(),
                    user.getApellidoUsuario(),
                    user.getDomicilioUsuario(),
                    user.getEmailPrincipalUsuario(),
                    user.getTelefonoUsuario(),
                    user.getFechaNacUsuario(),
                    user.getEstado()
            )).collect(Collectors.toList());
			
            return ResponseEntity.status(HttpStatus.OK).body(userDTOs);
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
			
	 	}
	 }  


    @PostMapping("/sync")
    public ResponseEntity<?> syncUser(@RequestBody AuthUserDTO userDTO) {
        
        try {
            userService.syncUser(userDTO);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
      
    }

    @GetMapping("/auth")
	public ResponseEntity<?> fetchAuthUsers(){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(authService.fetchUsers());
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
			
		}
	}  

    @GetMapping("/authPagination")
	public ResponseEntity<?> fetchAuthUsers(@RequestParam(defaultValue = "0") int page, 
                                            @RequestParam(defaultValue = "10") int size){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(authService.fetchUsersPagination(page,size));
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
			
		}
	}  


    @PostMapping("/auth/delete")
    public ResponseEntity<String> deleteUser(@RequestBody UserIdDTO user) {
        String userId = user.getUserId();
        
        if (userId == null || userId.isEmpty()) {
            return ResponseEntity.badRequest().body("El userId no puede estar vacío");
        }
        
        try {
            // 1. Eliminar de Auth0
            boolean auth0userDeleted = authService.deleteUserFromAuth0(userId);

            if (!auth0userDeleted) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                     .body("Error eliminando el usuario en Auth0");
            }


            Long javaId = null;
            try {
                // 2. Intentar obtener el ID en la base de datos Java
                javaId = userService.GetBdIdFromAuth(user);
            }catch (EntityNotFoundException e) {
            // Ignorar la excepción si el usuario no se encuentra en la base de datos de Java
                return ResponseEntity.ok("Usuario eliminado solo de Auth0, no estaba en la base de datos Java");
            }
            
           
            if (javaId != null) {
                boolean userDeleted = userService.delete(javaId);


                if (!userDeleted) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se elimino en Java por Error");
                }

                return ResponseEntity.status(HttpStatus.OK).body("Se elimino de Java");
            }

            return ResponseEntity.status(HttpStatus.OK).body("Se elimino de Todos lados");
        
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error1 eliminando el usuario: " + e.getMessage());
        }
    }

    @PostMapping("/newSync")
	public ResponseEntity<?> SyncUsers(){
		try {
            authService.syncUsers();
			return ResponseEntity.ok().build();
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
			
		}
	}  

    @PostMapping("/getJavaId")
    public ResponseEntity<?> GetJavaId(@RequestBody UserIdDTO javaUserDTO ){
        System.out.println("Auth0 ID recibido: " + javaUserDTO.getUserId());
        try {
            Long javaId = userService.GetBdIdFromAuth(javaUserDTO); 
            return ResponseEntity.ok(javaId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente más tarde.\"}" + e.getMessage());
        }
    }


    
}
