package com.benkynote.benkynote.dto;



import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthUserDTO {
    private String created_at;
    private String email;
    private boolean email_verified;
    //private List<Identity> identities;
    private String name;
    private String nickname;
    private String picture;
    private String updated_at;
    private String user_id;
    private UserMetadata user_metadata;
    private String last_ip;
    private String last_login;
    private int logins_count;

    

    // public static class Identity {
    //     private String userId;
    //     private String provider;
    //     private String connection;
    //     private boolean isSocial;

        
    // }

    @Getter
    @Setter
    public static class UserMetadata {
        private String apellido;
        private String nombre;
        private String usuario;
        private String perfil;
        private boolean is_new_user;
        
        
    }
}
