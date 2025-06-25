package com.benkynote.benkynote.controllers;

import com.benkynote.benkynote.dto.InstitutionDTO;
import com.benkynote.benkynote.models.Institution;
import com.benkynote.benkynote.services.InstitutionServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/institutions")
public class InstitutionController extends BaseControllerImpl<Institution, InstitutionServiceImpl> {

    @Autowired
    private InstitutionServiceImpl institutionService;

    

    // Crear una nueva institución
    @PostMapping("/create")
    public ResponseEntity<?> createInstitution(@RequestBody InstitutionDTO institutionDTO) {
        try {
            Institution newInstitution = institutionService.createInstitution(institutionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(newInstitution);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear la institución: " + e.getMessage());
        }
    }

    // // Obtener todas las instituciones con paginación
    // @GetMapping
    // public ResponseEntity<Page<Institution>> getAllInstitutions(
    //         @RequestParam Optional<Integer> page,
    //         @RequestParam Optional<Integer> size) {
    //     try {
    //         Pageable pageable = PageRequest.of(page.orElse(0), size.orElse(10));
    //         Page<Institution> institutions = institutionService.findAllPageable(pageable);
    //         return ResponseEntity.ok(institutions);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    //     }
    // }

    // Obtener una institución por ID
    // @GetMapping("/{id}")
    // public ResponseEntity<?> getInstitutionById(@PathVariable Long id) {
    //     try {
    //         Institution institution = institutionService.findById(id);

    //         return ResponseEntity.status(HttpStatus.OK).body(institution);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al buscar la institución");
    //     }
    // }

    // Actualizar una institución existente
    // @PutMapping("/{id}")
    // public ResponseEntity<?> updateInstitution(
    //         @PathVariable Long id, 
    //         @RequestBody InstitutionDTO institutionDTO) {
    //     try {
    //         Institution institutionData = institutionService.findById(id);

    //         if (institutionData != null) {
    //             institutionData.setNombreInstitucion(institutionDTO.getNombreInstitucion());
    //             institutionData.setCorreoInstitucion(institutionDTO.getCorreoInstitucion());
    //             institutionData.setTelefonoInstitucion(institutionDTO.getTelefonoInstitucion());
    //             institutionData.setSitioWeb(institutionDTO.getSitioWeb());
    //             institutionData.setFechaInicioCicloInstitucion(institutionDTO.getFechaInicioCicloInstitucion());
    //             institutionData.setFechaFinCicloInstitucion(institutionDTO.getFechaFinCicloInstitucion());
    //             institutionData.setCuentasHabilitadas(institutionDTO.getCuentasHabilitadas());
    //             institutionData.setNroEstudiantes(institutionDTO.getNroEstudiantes());
    //             institutionData.setNroProfesores(institutionDTO.getNroProfesores());
    //             institutionData.setCodigoValidacion(institutionDTO.getCodigoValidacion());

    //             institutionService.save(institutionData);
    //             return ResponseEntity.ok(institutionData);
    //         } else {
    //             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Institución no encontrada");
    //         }
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar la institución: " + e.getMessage());
    //     }
    // }

    // Desactivar una institución por ID
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateInstitution(@PathVariable Long id) {
        try {
            institutionService.deactivateInstitution(id);
            return ResponseEntity.ok("Institución desactivada exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al desactivar la institución: " + e.getMessage());
        }
    }

    // Eliminar una institución por ID
    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteInstitution(@PathVariable Long id) {
    //     try {
    //         institutionService.delete(id);
    //         return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Institución eliminada exitosamente");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al eliminar la institución: " + e.getMessage());
    //     }
    // }
}
