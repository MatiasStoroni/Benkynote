package com.benkynote.benkynote.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.dto.ExamDTO;
import com.benkynote.benkynote.enums.ExamState;
import com.benkynote.benkynote.models.Exam;
import com.benkynote.benkynote.models.ExamModification;
import com.benkynote.benkynote.models.ExamResolution;
import com.benkynote.benkynote.models.ExamStructure;
import com.benkynote.benkynote.models.InteractiveExam;
import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.NoteContent;
import com.benkynote.benkynote.models.NoteModification;
import com.benkynote.benkynote.models.Subject;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.ExamModificationRepository;
import com.benkynote.benkynote.repositories.ExamRepository;
import com.benkynote.benkynote.repositories.ExamResolutionRepository;
import com.benkynote.benkynote.repositories.ExamStructureRepository;
import com.benkynote.benkynote.repositories.InteractiveExamRepository;
import com.benkynote.benkynote.repositories.NoteRepository;
import com.benkynote.benkynote.repositories.NoteModificationRepository;
import com.benkynote.benkynote.repositories.SubjectRepository;
import com.benkynote.benkynote.repositories.UserRepository;

import jakarta.transaction.Transactional;


@Service
public class ExamServiceImpl extends BaseServiceImpl<Exam, Long> implements ExamService {
    private final ExamRepository examRepository;
    private final ExamModificationRepository examModificationRepository;
    private final ExamStructureRepository examStructureRepository;
    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final NoteModificationRepository noteModificationRepository;
    private final InteractiveExamRepository interactiveExamRepository;
    private final SubjectRepository subjectRepository;
    private final ExamResolutionRepository examResolutionRepository;


    public ExamServiceImpl(BaseRepository<Exam, Long> baseRepository, ExamRepository examRepository, UserRepository userRepository, NoteRepository noteRepository, NoteModificationRepository noteModificationRepository, ExamModificationRepository examModificationRepository, ExamStructureRepository examStructureRepository, InteractiveExamRepository interactiveExamRepository, SubjectRepository subjectRepository, ExamResolutionRepository examResolutionRepository){
        super(baseRepository);
        this.examRepository= examRepository;
        this.userRepository = userRepository;
        this.noteRepository= noteRepository;   
        this.noteModificationRepository = noteModificationRepository;    
        this.examModificationRepository= examModificationRepository;
        this.examStructureRepository= examStructureRepository;
        this.interactiveExamRepository = interactiveExamRepository;
        this.subjectRepository = subjectRepository;
        this.examResolutionRepository = examResolutionRepository;

    }

    /* 
     
    private int contarPalabrasEnApuntes(List<Note> apuntes) {
        int totalPalabras = 0;
        
        for (Note apunte : apuntes) {
            Optional<NoteModification> ultimaModificacion = noteModificationRepository.findLatestModificationByNoteId(apunte.getId());
            
            if (ultimaModificacion.isPresent()) {
                NoteContent contenido = ultimaModificacion.get().getContents();
                if (contenido != null && contenido.getTextoApunte() != null) {
                    String textoApunte = contenido.getTextoApunte().trim();
                    System.out.println("Texto apunte: " + textoApunte);
                    int palabrasEnApunte = textoApunte.split("\\s+").length;
                    totalPalabras += palabrasEnApunte;
                    System.out.println("Palabras en apunte: " + palabrasEnApunte);
                } else {
                    System.out.println("Contenido nulo para el apunte ID: " + apunte.getId());
                }
            } else {
                System.out.println("No se encontró la última modificación para el apunte ID: " + apunte.getId());
            }
        }
        
        System.out.println("Total de palabras en apuntes: " + totalPalabras);
        return totalPalabras;
    }
    */
  
    @Transactional
    @Override
    public Exam createExam(User user, ExamDTO examDTO) throws Exception {
        // Obtener los apuntes seleccionados
        List<Note> apuntes = noteRepository.findAllById(examDTO.getApuntesIds());

        List<Note> apuntesValidos = new ArrayList<>();
        for (Note apunte : apuntes){
            Optional<NoteModification> ultimaModificacion = noteModificationRepository.findFirstByNoteOrderByFechaModificacionApunteDesc(apunte);
            if(ultimaModificacion.isPresent()){
                NoteModification modificacion = ultimaModificacion.get();
                NoteContent ultimoContent= modificacion.getContents();
                if (ultimoContent.getTextoApunte() != null){
                    apuntesValidos.add(apunte); 
                }
            }
        }

        if (apuntesValidos.isEmpty()) {
            throw new Exception("No hay apuntes con contenido");
        }

        List<Subject> subjects = subjectRepository.findAllByNombreMateriaIn(examDTO.getMateria()); 

        if (subjects.isEmpty()) {
            throw new Exception("No se encontraron las materias seleccionadas");
        }

        // Crear la entidad Examen
        Exam exam = new Exam();
        exam.setNombreExamen(examDTO.getNombreExamen());
        exam.setDescripcionExamen(examDTO.getDescripcionExamen());
       // exam.getMateria().addAll(subjects);
        exam.setMateria(subjects);
        exam.setUser(user);
        exam.setExamModifications(new ArrayList<>());
        // Guardar la entidad Exam
        exam = examRepository.save(exam);

        // Obtener la estructura del examen seleccionada
        ExamStructure estructura = examStructureRepository.findById(examDTO.getEstructuraId())
            .orElseThrow(() -> new Exception("Estructura de examen no encontrada"));

        InteractiveExam contenido = new InteractiveExam();
        contenido.setContenido(examDTO.getContenidoExamen());
        interactiveExamRepository.save(contenido);
        
        // Crear la entidad ExamModification
        ExamModification examModification = new ExamModification();
        examModification.setFechaModificacionExamen(new Date());
        examModification.setExam(exam);
        examModification.setEstructura(estructura);
        examModification.setDuracion(examDTO.getDuracion());
        examModification.setApuntes(apuntesValidos);
        examModification.setContenidoExamen(contenido);

        // Guardar la entidad ExamModification
        examModificationRepository.save(examModification);
        exam.getExamModifications().add(examModification);

        // Crear entidad ExamResolution
        ExamResolution resolucion = new ExamResolution();
        resolucion.setEstado(ExamState.PENDIENTE);
        resolucion.setFechaCambioEstadoExamen(new Date());
        resolucion.setFechaResolucionExamen(null);
        resolucion.setExam(exam);

        exam.getResultado().add(resolucion);
        examResolutionRepository.save(resolucion);
        
        // Mostrar mensaje de éxito
        System.out.println("El Examen ha sido generado exitosamente");

        return exam;
    }

    @Transactional
    @Override
    public Exam deleteExam(Long examId) throws Exception {

        Exam examen = examRepository.findById(examId)
        .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        examen.markAsDeleted();
        examRepository.save(examen);

        ExamModification modification=new ExamModification();
        modification.setFechaModificacionExamen(new Date());
        modification.setExam(examen);

        examModificationRepository.save(modification);
        return examen;
    }


    @Override
    public Page findAllPageable(Pageable pageable) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
    }
}