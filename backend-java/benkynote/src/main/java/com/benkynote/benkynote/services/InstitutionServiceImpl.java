package com.benkynote.benkynote.services;

import java.util.regex.Pattern;
import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;  // Corregir el import de Pageable
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.dto.InstitutionDTO;
import com.benkynote.benkynote.enums.InstitutionState;
import com.benkynote.benkynote.models.Institution;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.InstitutionRepository;

import java.util.Optional;

@Service
public class InstitutionServiceImpl extends BaseServiceImpl<Institution, Long> implements InstitutionService {

    private final InstitutionRepository institutionRepository;

    public InstitutionServiceImpl(BaseRepository<Institution, Long> baseRepository, InstitutionRepository institutionRepository) {
        super(baseRepository);
        this.institutionRepository = institutionRepository;
    }

   
    public Institution createInstitution(InstitutionDTO institutionDTO) throws Exception {
        // Validaciones de los datos de la institución
        validateInstitutionData(institutionDTO);

        Institution institution = new Institution();
        institution.setNombreInstitucion(institutionDTO.getNombreInstitucion());
        institution.setCorreoInstitucion(institutionDTO.getCorreoInstitucion());
        institution.setTelefonoInstitucion(institutionDTO.getTelefonoInstitucion());
        institution.setSitioWeb(institutionDTO.getSitioWeb());
        institution.setFechaInicioCicloInstitucion(institutionDTO.getFechaInicioCicloInstitucion());
        institution.setFechaFinCicloInstitucion(institutionDTO.getFechaFinCicloInstitucion());
        institution.setCuentasHabilitadas(institutionDTO.getCuentasHabilitadas());
        institution.setNroEstudiantes(institutionDTO.getNroEstudiantes());
        institution.setNroProfesores(institutionDTO.getNroProfesores());
        institution.setEstado(InstitutionState.HABILITADO); // Estado habilitado por defecto
        institution.setCodigoValidacion(institutionDTO.getCodigoValidacion()); // Solo si aplica

        // Guardar la institución y manejar errores
        try {
            return institutionRepository.save(institution);
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar la institución: " + e.getMessage());
        }
    }

    
    public void deactivateInstitution(Long institutionId) {
        // Obtener la institución por ID
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new RuntimeException("La institución no fue encontrada"));

        // Cambiar estado a deshabilitado
        institution.setEstado(InstitutionState.DESHABILITADO);
        institutionRepository.save(institution);
    }


    private void validateInstitutionData(InstitutionDTO institutionDTO) throws Exception {
        // Validación de correo electrónico
        final Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        if (!emailPattern.matcher(institutionDTO.getCorreoInstitucion()).matches()) {
            throw new RuntimeException("Correo no válido");
        }
        // Comprobar si el correo ya está registrado
        if (institutionRepository.findByCorreoInstitucion(institutionDTO.getCorreoInstitucion()) != null) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // // Validación del nombre de la institución
        // final Pattern namePattern = Pattern.compile("^[A-Z][a-z]{0,49}$");
        // if (!namePattern.matcher(institutionDTO.getNombreInstitucion()).matches()) {
        //     throw new RuntimeException("El nombre de la institución debe tener entre 1 y 50 caracteres y no contener caracteres especiales");
        // }

        // Validación del sitio web
        // final Pattern webSitePattern = Pattern.compile("^[a-zA-Z0-9._%+-]+\\.[a-zA-Z]{1,100}$");
        // if (!webSitePattern.matcher(institutionDTO.getSitioWeb()).matches() || institutionDTO.getSitioWeb().length() < 1 || institutionDTO.getSitioWeb().length() > 100) {
        //     throw new RuntimeException("El sitio web debe tener entre 1 y 100 caracteres y ser válido");
        // }

        // Validación de fechas
        // if (institutionDTO.getFechaInicioCicloInstitucion().after(institutionDTO.getFechaFinCicloInstitucion())) {
        //     throw new RuntimeException("La fecha de inicio del ciclo debe ser menor o igual a la fecha de fin del ciclo");
        // }

        // Otras validaciones adicionales según sea necesario
    }

    
   

    
    @Override
    public Page findAllPageable(
             org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable pageable)throws Exception {
        // TODO Auto-generated method stub
         throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
     }
}
