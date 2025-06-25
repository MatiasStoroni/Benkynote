package com.benkynote.benkynote.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendNewUserCodeEmail(String to, String name, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Notificación de Alta de Cuenta");
        message.setText("Hola, " + name + "\n\n" +
                "Ya casi estás. Solo necesitamos asegurar que tú seas tú.\n\n" +
                "Copia y pega el siguiente código de verificación y ya serás parte de BenkyNote. ¡Hurra!\n\n" +
                code + "\n\n" +
                "Gracias.\n" +
                "El equipo de BenkyNote.");
        try {
            mailSender.send(message);
        } catch (Exception e) {
            // Manejo de la excepción, por ejemplo, loguear el error o lanzar una excepción personalizada
            throw new RuntimeException("Error al enviar el correo de verificación", e);
        }
    }

    public void sendConfirmationEmail(String to, String name, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Notificación de Baja de Cuenta");
        message.setText("Hola, " + name + "\n\n" +
                "Lamentamos que desees irte, necesitamos asegurar que estés seguro/a de tu decisión. \n\n" +
                "Copia y pega el siguiente código de confirmación. De no ser tú, solo ignora el mensaje.\n\n" +
                code + "\n\n" +
                "Gracias.\n" +
                "El equipo de BenkyNote.");
        mailSender.send(message);
    }

    public void sendNewAdminEmail(String to, String name, String lastname, String username, String password ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Notificación de Alta de Usuario administrador de Institución");
        message.setText("Hola, " +  "\n\n" +
                "Se ha dado de alta el usuario administrador con los siguientes datos:\n\n" +
                name + " " + lastname +"\n\n" +
                username + "\n\n" +
                password + "\n\n" +
                "El mismo ya se encuentra habilitado para operar dentro del sistema.\n" +
                "Atentamente.\n" +
                "El equipo de BenkyNote.");
        mailSender.send(message);
    }
}