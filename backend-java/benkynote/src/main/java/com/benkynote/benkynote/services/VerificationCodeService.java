package com.benkynote.benkynote.services;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public class VerificationCodeService {
    private final ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final EmailService emailService;

    public VerificationCodeService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void generateAndSendVerificationCode(String email, String name, String code) {
        verificationCodes.put(email, code);
          
        // Enviar el código al usuario por correo
        emailService.sendNewUserCodeEmail(email, name, code);

        // Programar eliminación del código después de 15 minutos
        scheduler.schedule(() -> verificationCodes.remove(email), 15, TimeUnit.MINUTES);
    }

    public void generateAndSendConfirmationCode(String email, String name, String code) {
        verificationCodes.put(email, code);
        // Enviar el código al usuario por correo
        emailService.sendConfirmationEmail(email, name, code);
        // Programar eliminación del código después de 15 minutos
        scheduler.schedule(() -> verificationCodes.remove(email), 15, TimeUnit.MINUTES);
    }

    // Verificar código
    public boolean verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        return storedCode != null && storedCode.equals(code);
    }

    // Generar código de verificación 
    public String generateCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }
}