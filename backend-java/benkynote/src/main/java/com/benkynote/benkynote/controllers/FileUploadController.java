package com.benkynote.benkynote.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    // Ruta de la carpeta donde se guardarán los archivos
    private static String UPLOADED_FOLDER = "src/main/resources/static/calendar/";

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Por favor, selecciona un archivo para subir.";
        }

        try {
            // Obtiene el archivo y lo guarda en la carpeta especificada
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            return "Archivo subido exitosamente: " + file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al subir el archivo.";
        }
    }
}
