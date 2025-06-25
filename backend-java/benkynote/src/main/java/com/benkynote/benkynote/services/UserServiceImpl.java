package com.benkynote.benkynote.services;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Pattern;

import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.dto.AuthUserDTO;
import com.benkynote.benkynote.dto.UserIdDTO;
import com.benkynote.benkynote.dto.UserDTO;
import com.benkynote.benkynote.dto.UserIdDTO;
import com.benkynote.benkynote.enums.UserState;
import com.benkynote.benkynote.models.Calendar;
import com.benkynote.benkynote.models.Institution;
import com.benkynote.benkynote.models.Profile;
import com.benkynote.benkynote.models.StudySession;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.InstitutionRepository;
import com.benkynote.benkynote.repositories.ProfileRepository;
import com.benkynote.benkynote.repositories.UserRepository;
import com.benkynote.benkynote.security.AuthService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl extends BaseServiceImpl<User, Long> implements UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final InstitutionRepository institutionRepository;
    private CalendarService calendarService;
    private StudySessionService studySessionService;
    private final EmailService emailService;
    private final VerificationCodeService verificationCodeService;
    // private final AuthService authService;

    public UserServiceImpl(BaseRepository<User, Long> baseRepository, UserRepository userRepository,
            ProfileRepository profileRepository,
            InstitutionRepository institutionRepository, CalendarService calendarService,
            StudySessionService studySessionService,
            EmailService emailService, VerificationCodeService verificationCodeService
    // AuthService authService
    ) {

        super(baseRepository);
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.institutionRepository = institutionRepository;
        this.calendarService = calendarService;
        this.studySessionService = studySessionService;
        this.emailService = emailService;
        this.verificationCodeService = verificationCodeService;
        // this.authService = authService;
    }

    public User createExample(User user) {
        return userRepository.save(user);
    }

    public String generateRandomUsername() {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int usernameLength = 8; // Se puede ajustar
        StringBuilder username = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < usernameLength; i++) {
            username.append(characters.charAt(random.nextInt(characters.length())));
        }
        String generatedUsername = username.toString();

        // Asegurar que el nombre de usuario sea único
        while (userRepository.findByUsuario(generatedUsername) != null) {
            generatedUsername = generateRandomUsername();
        }
        return generatedUsername;
    }

    /*
     * /
     * public String generatePassword() {
     * String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     * String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
     * String numbers = "0123456789";
     * String characters = ".-_/()$&?¿¡!";
     * String allCharacters = upperCaseLetters + lowerCaseLetters + characters +
     * numbers;
     * 
     * StringBuilder password = new StringBuilder();
     * Random random = new Random();
     * 
     * password.append(upperCaseLetters.charAt(random.nextInt(upperCaseLetters.
     * length())));
     * // Asegurarse de que la contraseña tenga al menos una letra y un número
     * 
     * password.append(numbers.charAt(random.nextInt(numbers.length())));
     * for (int i = 0; i < 6; i++) { // 6 más para llegar a un total de 8 caracteres
     * // Generar el resto de la contraseña
     * password.append(allCharacters.charAt(random.nextInt(allCharacters.length())))
     * ;
     * }
     * 
     * return password.toString();
     * }
     * 
     * public User createAdministrator(UserDTO adminUserDTO) throws Exception {
     * final Pattern emailPattern = Pattern.compile(
     * "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
     * 
     * final Pattern namePattern = Pattern.compile(
     * "^[a-zA-Z]{1,50}$");
     * 
     * if (!emailPattern.matcher(adminUserDTO.getEmailUsuario()).matches()) {
     * throw new RuntimeException("Correo no válido");
     * }
     * 
     * // Validar que el correo es único
     * if
     * (userRepository.findByEmailPrincipalUsuario(adminUserDTO.getEmailUsuario())
     * != null) {
     * throw new RuntimeException("El correo ya está registrado");
     * }
     * 
     * // Validar el nombre
     * if (!namePattern.matcher(adminUserDTO.getNombreUsuario()).matches()) {
     * throw new
     * RuntimeException("El nombre debe tener entre 1 y 50 caracteres y no contener caracteres especiales"
     * );
     * }
     * 
     * // Validar el apellido
     * if (!namePattern.matcher(adminUserDTO.getApellidoUsuario()).matches()) {
     * throw new
     * RuntimeException("El apellido debe tener entre 1 y 50 caracteres y no contener caracteres especiales"
     * );
     * }
     * 
     * // Convertir DTO a entidad User
     * User adminUser = new User();
     * adminUser.setNombreUsuario(adminUserDTO.getNombreUsuario());
     * adminUser.setApellidoUsuario(adminUserDTO.getApellidoUsuario());
     * adminUser.setEmailPrincipalUsuario(adminUserDTO.getEmailUsuario());
     * adminUser.setPasswordUsuario(adminUserDTO.getPasswordUsuario());
     * 
     * // Generar un nombre de usuario único
     * String generatedUsername = generateRandomUsername();
     * adminUser.setUsuario(generatedUsername);
     * 
     * // Generar una contraseña
     * String generatedPassword = generatePassword();
     * adminUser.setPasswordUsuario(generatedPassword);
     * 
     * // Asignar rol de administrador
     * Profile adminPerfil =
     * profileRepository.findByNombrePerfil("ADMINISTRADOR DE INSTITUCION").
     * orElseThrow(() -> new
     * RuntimeException("Rol de administrador no encontrado"));
     * adminUser.setProfiles(Collections.singleton(adminPerfil));
     * 
     * adminUser.setEstado(UserState.HABILITADO);
     * 
     * try {
     * User savedUser = userRepository.save(adminUser);
     * // Enviar el correo de notificación
     * emailService.sendNewAdminEmail(savedUser.getEmailPrincipalUsuario(),
     * savedUser.getNombreUsuario(), savedUser.getApellidoUsuario(),
     * savedUser.getUsuario(), savedUser.getPasswordUsuario());
     * return savedUser;
     * } catch (Exception e) {
     * throw new RuntimeException("Error al registrar el usuario: " +
     * e.getMessage());
     * }
     * }
     */

    public User createUser(User user) throws Exception {
        // Validar correo electrónico
        validateEmail(user.getEmailPrincipalUsuario());

        // Verificar que el correo y usuario sean únicos
        verifyUniqueEmailAndUsername(user);

        try {
            user = userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar el usuario: " + e.getMessage());
        }

        // Crear y asociar el calendario al usuario
        associateCalendarToUser(user);

        // Crear y asociar la sesión de estudio al usuario
        associateStudySessionToUser(user);

        // Aquí puedes añadir otras asociaciones, como el perfil, la institución, etc.
        // assignProfileToUser(user);
        // validateInstitutionAndEmail(user);

        // Guardar el usuario en la base de datos
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar el usuario: " + e.getMessage());
        }
    }

    private void validateEmail(String email) {
        final Pattern emailPattern = Pattern.compile(
                "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        if (!emailPattern.matcher(email).matches()) {
            throw new RuntimeException("Correo no válido");
        }
    }

    private void verifyUniqueEmailAndUsername(User user) {
        if (userRepository.findByEmailPrincipalUsuario(user.getEmailPrincipalUsuario()) != null) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // if (userRepository.findByUsuario(user.getUsuario()) != null) {
        // throw new RuntimeException("El usuario ya está registrado");
        // }

        // Puedes agregar validación de formato del usuario si es necesario
    }

    private void associateCalendarToUser(User user) throws Exception {
        Calendar calendario = new Calendar();
        calendarService.save(calendario); // Guardar el calendario
        user.setCalendario(calendario); // Asociarlo al usuario
    }

    private void associateStudySessionToUser(User user) throws Exception {
        StudySession studySession = new StudySession();
        studySession.setUser(user);
        studySessionService.save(studySession); // Guardar la sesión de estudio
        user.setStudySession(studySession); // Asociarla al usuario
    }

    // Cambio a estado Deshabilitado luego de 20 dias
    public void disablePendingUsers() {
        // Obtener la lista de usuarios en estado PENDIENTE_DE_BAJA
        List<User> pendingUsers = userRepository.findByEstado(UserState.PENDIENTE_DE_BAJA);
        LocalDateTime now = LocalDateTime.now();

        for (User user : pendingUsers) {
            // Verificar si han pasado 20 días desde la solicitud de desactivación
            // if (user.getDeactivationRequestDate().plusDays(20).isBefore(now)) {
            // Cambiar el estado a DESHABILITADO
            user.setEstado(UserState.DESHABILITADO);
            userRepository.save(user); // Guardar los cambios en la base de datos
        }
    }

    public void deactivateUser(Long userId) {
        // Obtener el usuario por ID
        User usuario = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("El usuario no encontrado"));
        if (!usuario.getProfiles().equals("ADMINISTRADOR DE INSTITUCION")) {
            String code = verificationCodeService.generateCode(); // Genera el código
            verificationCodeService.generateAndSendConfirmationCode(usuario.getEmailPrincipalUsuario(),
                    usuario.getNombreUsuario(), code);
            boolean codigo = verificationCodeService.verifyCode(usuario.getEmailPrincipalUsuario(), code);
            if (!codigo) {
                throw new IllegalArgumentException("Código de verificación inválido o expirado");
            }
            usuario.setEstado(UserState.PENDIENTE_DE_BAJA);
        } else {
            // Usuario Administrador pasa directamente al estado deshabilitado
            usuario.setEstado(UserState.DESHABILITADO);
        }

        userRepository.save(usuario);
        // RESOLVER CAMBIO DE ESTADO LUEGO DE 20 DIAS
    }

    public User updateUser(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("El usuario no encontrado"));

        if (userDTO.getNombreUsuario() != null) {
            user.setNombreUsuario(userDTO.getNombreUsuario());
        }
        if (userDTO.getApellidoUsuario() != null) {
            user.setApellidoUsuario(userDTO.getApellidoUsuario());
        }
        if (userDTO.getUsuario() != null) {
            user.setUsuario(userDTO.getUsuario());
        }
        if (userDTO.getTelefonoUsuario() != null) {
            user.setTelefonoUsuario(userDTO.getTelefonoUsuario());
        }
        if (userDTO.getFechaNacUsuario() != null) {
            user.setFechaNacUsuario(userDTO.getFechaNacUsuario());
        }
        if (userDTO.getEmailUsuario() != null) {
            user.setEmailSecundarioUsuario(userDTO.getEmailUsuario());
        }

        return userRepository.save(user);
    }

    /*
     * public User addCalendar(Long userId) throws Exception{
     * User user = userRepository.findById(userId).orElseThrow(() -> new
     * RuntimeException("El usuario no encontrado"));
     * 
     * Calendar calendar = new Calendar();
     * calendarService.save(calendar);
     * user.setCalendario(calendar);
     * try{
     * return userRepository.save(user);
     * }catch(Exception e){
     * throw new RuntimeException("Error al registrar el usuario: " +
     * e.getMessage());
     * }
     * 
     * 
     * }
     * public User login(String username, String password) {
     * Optional<User> optionalUser = userRepository.findByUsername(username);
     * if (optionalUser.isPresent()) {
     * User user = optionalUser.get();
     * //if (passwordEncoder.matches(password, user.getPasswordUsuario())) {
     * return user;
     * }
     * }
     * throw new RuntimeException("Usuario y/o contraseña no válido");
     * }
     */

    public void syncUser(AuthUserDTO userDTO) {

        // Buscar usuario existente en la base de datos
        User existingUser = userRepository.findByEmailPrincipalUsuario(userDTO.getEmail());

        // Extraer datos del user_metadata directamente
        String nombre = userDTO.getUser_metadata().getNombre();
        String apellido = userDTO.getUser_metadata().getApellido();
        String usuario = userDTO.getUser_metadata().getUsuario();
        String authId = userDTO.getUser_id();

        // Si el usuario ya existe, actualizamos sus datos si es necesario
        if (existingUser != null) {
            boolean needsUpdate = false;

            // Verificar y actualizar campos, si han cambiado
            if (!existingUser.getNombreUsuario().equals(nombre)) {
                existingUser.setNombreUsuario(nombre);
                needsUpdate = true;
            }

            if (!existingUser.getApellidoUsuario().equals(apellido)) {
                existingUser.setApellidoUsuario(apellido);
                needsUpdate = true;
            }

            if (!existingUser.getUsuario().equals(usuario)) {
                existingUser.setUsuario(usuario);
                needsUpdate = true;
            }

            if (existingUser.getAuth0Id() == null || !existingUser.getAuth0Id().equalsIgnoreCase(authId)) {
                existingUser.setAuth0Id(authId);
                needsUpdate = true;
            }

            // Si hay cambios, actualizar el usuario en la base de datos
            if (needsUpdate) {
                try {
                    userRepository.save(existingUser);
                    System.out.println("Usuario actualizado con éxito");
                } catch (Exception e) {
                    System.err.println("Error al actualizar el usuario: " + e.getMessage());
                    e.printStackTrace();
                }
            }
            return;
        }

        // Si el usuario no existe, crearlo
        User newUser = new User();
        newUser.setAuth0Id(userDTO.getUser_id());
        newUser.setEmailPrincipalUsuario(userDTO.getEmail());
        newUser.setNombreUsuario(nombre);
        newUser.setApellidoUsuario(apellido);
        newUser.setUsuario(usuario);

        try {
            createUser(newUser);
            System.out.println("Usuario creado con éxito");
        } catch (Exception e) {
            System.err.println("Error al crear el usuario: " + e.getMessage());
            e.printStackTrace();
        }

    }

    public Long GetBdIdFromAuth(UserIdDTO javaUserDto){
        
        Optional<User> user = userRepository.findByAuth0Id(javaUserDto.getUserId());
        if (!user.isPresent()) {
            throw new EntityNotFoundException("No user found with Auth0 ID: " + javaUserDto.getUserId());
        }
        System.out.println("Auth0 ID: " + javaUserDto.getUserId());
        
        User realUser = user.get();
        
        return realUser.getId();
    }

    @Override
    public Page findAllPageable(Pageable pageables) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
    }

}
