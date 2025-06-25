package com.benkynote.benkynote.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.boot.autoconfigure.web.WebProperties.Resources.Chain.Strategy.Content;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.dto.NoteDTO;
import com.benkynote.benkynote.dto.UpdatedNoteDTO;
import com.benkynote.benkynote.enums.CommentState;
import com.benkynote.benkynote.enums.NoteState;
import com.benkynote.benkynote.models.Comment;
import com.benkynote.benkynote.models.CommentModification;
import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.NoteContent;
import com.benkynote.benkynote.models.NoteModification;
import com.benkynote.benkynote.models.Subject;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.CommentModificationRepository;
import com.benkynote.benkynote.repositories.CommentRepository;
import com.benkynote.benkynote.repositories.NoteContentRepository;
import com.benkynote.benkynote.repositories.NoteModificationRepository;
import com.benkynote.benkynote.repositories.NoteRepository;
import com.benkynote.benkynote.repositories.SubjectRepository;
import com.benkynote.benkynote.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class NoteServiceImpl extends BaseServiceImpl<Note, Long> implements NoteService {
    private final NoteRepository noteRepository;
    private final NoteModificationRepository noteModificationRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;
    private final CommentRepository commentRepository;
    private final CommentModificationRepository commentModificationRepository;


    public NoteServiceImpl(BaseRepository<Note, Long> baseRepository, NoteRepository noteRepository, UserRepository userRepository, NoteContentRepository noteContentRepository, NoteModificationRepository noteModificationRepository, SubjectRepository subjectRepository, CommentRepository commentRepository, CommentModificationRepository commentModificationRepository ){
        super(baseRepository);
        this.noteRepository= noteRepository;
        this.noteModificationRepository= noteModificationRepository;
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
        this.commentRepository = commentRepository;
        this.commentModificationRepository = commentModificationRepository;
    }

    public Note createNote(Long userId, NoteDTO noteDTO) {
    
        User propietario = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado")); 

        if (noteRepository.findByNombreApunteAndUser(noteDTO.getNombreApunte(), propietario).isPresent()){
            throw new RuntimeException("Ya existe un apunte con ese nombre");
        }

        Subject materia = subjectRepository.findByNombreMateria(noteDTO.getNombreMateria()).orElseThrow(() -> new RuntimeException("Materia no encontrada"));
        
        Note note = new Note();
        note.onCreate();
        note.setNombreApunte(noteDTO.getNombreApunte());  
        note.setSubject(materia);      
        note.setEtiquetaApunte(noteDTO.getEtiquetaApunte());
        note.setEsTranscripcion(false);
        note.setUser(propietario);
        note.setSubject(materia);

        // Asignar los colaboradores a la nota
        List<String> colaboradoresEmail = noteDTO.getColaboradoresEmail();

        // Si la lista de correos electrónicos de colaboradores es nula o vacía, asigna una lista vacía a los colaboradores
        List<User> colaboradores = Collections.emptyList();

        if (colaboradoresEmail != null && !colaboradoresEmail.isEmpty()) {
            
            Optional<List<User>> colaboradoresOptional = userRepository.findByEmailPrincipalUsuarioIn(colaboradoresEmail);
    
            // Asignar la lista de colaboradores si existe, si no, mantener la lista vacía
            colaboradores = colaboradoresOptional.orElse(Collections.emptyList());
        }

        note.setColab(colaboradores);
        note= noteRepository.save(note);
        
        // Crear la primera modificación con el estado inicial
        NoteModification modification = new NoteModification();
        modification.setFechaModificacionApunte(new Date());
        
        modification.setNote(note);
        modification.setState(NoteState.EN_DESARROLLO); // Estado inicial

        // Crear el contenido de un Apunte inicialmente VACIO
        NoteContent content = new NoteContent();
        content.setTextoApunte(null);
        //content.setModification(modification); 

        // Asegúrate de que la lista esté inicializada antes de agregarle contenido
        //if (modification.getContents() == null) {
            //modification.setContents(new ArrayList<>());
        //}

        //modification.getContents().add(content);
        modification.setContents(content);
        noteModificationRepository.save(modification);

        return note;
    }

    @Override
    @Transactional
    public Note changeState(Long noteId, NoteState newState) {
        // Buscar el apunte
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Apunte no encontrado"));

        // Buscar la última modificación asociada a la nota
        NoteModification ultimaModificacion = noteModificationRepository.findFirstByNoteOrderByFechaModificacionApunteDesc(note).orElseThrow(() -> new RuntimeException("No se encontró una modificación previa"));

        // Crear una nueva modificación con el nuevo estado
        NoteModification modification = new NoteModification();
        modification.setFechaModificacionApunte(new Date());
        modification.setNote(note);
        modification.setState(newState);
        
        // Clonar el contenido de la última modificación (si existe)
        NoteContent contenidoAnterior = ultimaModificacion.getContents();
        if (contenidoAnterior != null) {
            NoteContent nuevoContenido = new NoteContent();
            nuevoContenido.setTextoApunte(contenidoAnterior.getTextoApunte());  // Copiar el texto del apunte
            modification.setContents(nuevoContenido);  // Asociar el contenido a la nueva modificación
        }
        
        noteModificationRepository.save(modification);

        // Guardar los cambios en el apunte
        return noteRepository.save(note);
    }


    @Override
    @Transactional
    public NoteModification updateNote(Long noteId, UpdatedNoteDTO  apunteNuevo) {
        // Validar si la nota existe 
        if (!noteRepository.existsById(noteId)) {
            throw new RuntimeException("Apunte no encontrado");
        }

        // Buscar el apunte
        Note note = noteRepository.findByIdAndFechaBajaIsNull(noteId)
            .orElseThrow(() -> new RuntimeException("Apunte eliminado"));

        // Actualizar campos del apunte
        note.setNombreApunte(apunteNuevo.getNombreApunte());
        note.setEtiquetaApunte(apunteNuevo.getEtiquetaApunte());
        // La materia no se cambia

        // Asignar los colaboradores nuevos a la nota
        List<String> colaboradoresEmail = apunteNuevo.getColaboradoresEmail();

        // Si la lista de correos electrónicos de colaboradores es nula o vacía, asigna una lista vacía a los colaboradores
        List<User> nuevosColaboradores = Collections.emptyList();

        if (colaboradoresEmail != null && !colaboradoresEmail.isEmpty()) {
            
            Optional<List<User>> colaboradoresOptional = userRepository.findByEmailPrincipalUsuarioIn(colaboradoresEmail);
    
            // Asignar la lista de colaboradores si existe, si no, mantener la lista vacía
            nuevosColaboradores = colaboradoresOptional.orElse(Collections.emptyList());
        }
       
        note.setColab(nuevosColaboradores);

        // Guardar la nota actualizada
        noteRepository.save(note);

        // Obtener la última modificación de la nota si existe
        Optional<NoteModification> ultimaModificacionOptional = noteModificationRepository.findFirstByNoteOrderByFechaModificacionApunteDesc(note);

        // Crear una modificación de la nota para el historial
        NoteModification modification = new NoteModification();
        modification.setFechaModificacionApunte(new Date());
        modification.setNote(note);

        // Mantener el estado de la modificación anterior si existe
        if (ultimaModificacionOptional.isPresent()) {
            NoteModification ultimaModificacion = ultimaModificacionOptional.get();
            modification.setState(ultimaModificacion.getState());  // Mantiene el estado anterior

            // Clonar el contenido de la última modificación
            NoteContent contenidoAnterior = ultimaModificacion.getContents();
            if (contenidoAnterior != null) {
                NoteContent nuevoContenido = new NoteContent();
                nuevoContenido.setTextoApunte(contenidoAnterior.getTextoApunte());  // Copiar el contenido del texto
                modification.setContents(nuevoContenido);  // Asignar el contenido a la nueva modificación
        }
        } else { // Si no hay modificaciones previas, se puede establecer un estado predeterminado
            modification.setState(NoteState.EN_DESARROLLO); 
    }
        return noteModificationRepository.save(modification);
    }

    @Override
    @Transactional
    public NoteModification deleteNote(Long noteId) {
        
        // Buscar la nota por ID
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new RuntimeException("Apunte no encontrado"));

        // Marcar la nota como eliminada usando el método markAsDeleted()
        note.markAsDeleted();
        // Guardar los cambios en la base de datos
        noteRepository.save(note);

        // Obtener la última modificación de la nota si existe
        Optional<NoteModification> ultimaModificacion = noteModificationRepository.findFirstByNoteOrderByFechaModificacionApunteDesc(note);
        if(ultimaModificacion.isPresent()){
            NoteModification modificacion = ultimaModificacion.get();
            NoteContent ultimoContent= modificacion.getContents();
            // Si existe contenido asociado, buscar los comentarios asociados al contenido
            if (ultimoContent.getTextoApunte() != null) {
                List<Comment> comentarios = ultimoContent.getComentarios();

                // Iterar sobre los comentarios y marcarlos como eliminados
                for (Comment comentario : comentarios) {
                    // Cambiar el estado del comentario a "Eliminado"
                    comentario.markAsDeleted(); // Asegúrate de tener un método similar en tu clase Comment

                    // Guardar las modificaciones de los comentarios (historial de eliminación)
                    CommentModification commentModification = new CommentModification();
                    commentModification.setComentario(comentario);
                    commentModification.setState(CommentState.ELIMINADO); // Asegúrate de tener este estado
                    commentModification.setFechaModificacionEC(new Date());

                    // Guardar la modificación del comentario
                    commentModificationRepository.save(commentModification);
                }

                // Guardar los comentarios actualizados
                commentRepository.saveAll(comentarios);
            }
        }
        
        // Crear una nueva modificación para el historial
        NoteModification modification = new NoteModification();
        modification.setFechaModificacionApunte(new Date());
        modification.setState(NoteState.ELIMINADO);  // Establecer el estado como eliminado  
        modification.setNote(note);

        // Guardar la modificación en el historial
        return noteModificationRepository.save(modification);
    }

    @Override
    @Transactional
    public NoteModification createContent(Long noteId, NoteDTO apunte) {
        // Buscar la nota
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Apunte no encontrado"));
        
         // Crear una nueva modificación
        NoteModification modificacion = new NoteModification();
        modificacion.setFechaModificacionApunte(new Date());
        modificacion.setNote(note);  // Asociar la nueva modificación con la nota
        modificacion.setState(NoteState.EN_DESARROLLO);
        /*
        // Buscar la última modificación asociada a la nota
        NoteModification modificacion = noteModificationRepository.findFirstByNoteOrderByFechaModificacionApunteDesc(note)
                .orElseThrow(() -> new RuntimeException("Modificación no encontrada"));
        */
        // Crear el nuevo contenido
        NoteContent contenido = new NoteContent();
        contenido.setTextoApunte(apunte.getContenidoApunte());
        //contenido.setModification(modificacion); // Asociar el contenido con la modificación
        //noteContentRepository.save(contenido);
    
        /*
        // Agregar el nuevo contenido a la lista de contenidos de la modificación
        List<NoteContent> contenidosExistentes = modificacion.getContents();
        contenidosExistentes.add(contenido);
        modificacion.setContents(contenidosExistentes);
        */
        
        // Asociar el nuevo contenido con la nueva modificación
        modificacion.setContents(contenido);  // Relación OneToOne
        
        // Guardar la modificación actualizada
        return noteModificationRepository.save(modificacion);
    }
    
    @Override
    public List<Note> findNoteBySubject(User usuario, String nombreMateria) throws Exception {
        Subject materia = subjectRepository.findByNombreMateria(nombreMateria)
                            .orElseThrow(() -> new Exception("La materia no existe"));
        // Se pasa la instancia completa del usuario y la materia
        List <Note> apuntes = noteRepository.findByUserAndSubject(usuario, materia);

        List<Note> apuntesValidos = new ArrayList<>();

        for (Note apunte : apuntes) {
            Optional<NoteModification> ultimaModificacion = noteModificationRepository.findLatestModificationByNoteId(apunte.getId());

            if (ultimaModificacion.isPresent() && !ultimaModificacion.get().getState().equals(NoteState.ELIMINADO)) {
                // Añadir solo los apuntes que no están eliminados
                apuntesValidos.add(apunte);
            }
        }

        if (apuntesValidos.isEmpty()) {
            throw new Exception("No hay apuntes asociados a la materia: " + nombreMateria);
        }

        return apuntesValidos;
    }


    @Override
    public Page findAllPageable(Pageable pageable) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
    }
   
    
}
