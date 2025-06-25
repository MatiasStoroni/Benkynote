package com.benkynote.benkynote.services;

import java.util.Date;

import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.enums.CommentState;
import com.benkynote.benkynote.models.Comment;
import com.benkynote.benkynote.models.CommentModification;
import com.benkynote.benkynote.models.CommentResponse;
import com.benkynote.benkynote.models.Note;
import com.benkynote.benkynote.models.NoteModification;
import com.benkynote.benkynote.models.NoteContent;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.CommentModificationRepository;
import com.benkynote.benkynote.repositories.CommentRepository;
import com.benkynote.benkynote.repositories.NoteModificationRepository;
import com.benkynote.benkynote.repositories.NoteRepository;
import com.benkynote.benkynote.repositories.UserRepository;

@Service
public class CommentServiceImpl extends BaseServiceImpl<Comment, Long> implements CommentService{

    private final NoteRepository noteRepository;
    private final NoteModificationRepository noteModificationRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CommentModificationRepository commentModificationRepository;

    public CommentServiceImpl(BaseRepository<Comment, Long> baseRepository, UserRepository userRepository, NoteRepository noteRepository, NoteModificationRepository noteModificationRepository, CommentRepository commentRepository, CommentModificationRepository commentModificationRepository){
        super(baseRepository);
        this.noteRepository= noteRepository;
        this.noteModificationRepository= noteModificationRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.commentModificationRepository = commentModificationRepository;
    }

    public Comment createComment(String comentarioTexto, Long userId, Long noteId) throws Exception {
    // Búsqueda del apunte
    Note apunte = noteRepository.findById(noteId)
        .orElseThrow(() -> new Exception("Apunte no encontrado"));

    // Búsqueda de la última modificación del apunte
    NoteModification ultimaModificacion = noteModificationRepository
        .findFirstByNoteOrderByFechaModificacionApunteDesc(apunte)
        .orElseThrow(() -> new Exception("No se encontró una modificación para este apunte"));

    // Verificar si la última modificación tiene contenido asociado
    NoteContent contenidoApunte = ultimaModificacion.getContents();
    if (contenidoApunte == null) {
        throw new Exception("El apunte no tiene contenido asociado");
    }

    // Búsqueda del usuario que crea el comentario
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new Exception("Usuario no encontrado"));

    // Verificar si el usuario es colaborador del apunte o es el propietario
    if (!apunte.getColab().contains(user) && !apunte.getUser().equals(user)) {
        throw new Exception("El usuario no tiene permisos para comentar en este apunte");
    }

    // Crear el nuevo comentario
    Comment comentario = new Comment();
    comentario.setContenidoComentario(comentarioTexto);
    comentario.setComentarioApunte(contenidoApunte);
    comentario.setAutor(user);

    // Crear y asociar la modificación del comentario
    CommentModification commentModification = new CommentModification();
    commentModification.setFechaModificacionEC(new Date());
    commentModification.setState(CommentState.ABIERTO);
    commentModification.setComentario(comentario);

    // Asociar la modificación al comentario
    comentario.getModificacionEC().add(commentModification);

    // Agregar el comentario al contenido del apunte
    contenidoApunte.getComentarios().add(comentario);

    // Guardar el comentario
    commentRepository.save(comentario);

    return comentario;
}


    public Comment respondComment(Long commentId, Long userId, String respuesta) throws Exception {
        //Busqueda Comentario
        Comment comentario = commentRepository.findById(commentId).orElseThrow(() -> new Exception("Comentario no encontrado"));
        
    // Búsqueda del usuario que responde
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new Exception("Usuario no encontrado"));

    // Crear una nueva respuesta
    CommentResponse nuevaRespuesta = new CommentResponse();
    nuevaRespuesta.setContenidoRespuesta(respuesta);
    nuevaRespuesta.setAutorRespuesta(user);
    nuevaRespuesta.setComentario(comentario);

    // Agregar la nueva respuesta a la lista de respuestas
    comentario.getRespuestas().add(nuevaRespuesta);

    // Guardar el comentario con la nueva respuesta
    return commentRepository.save(comentario);
}

    public Comment resolverComment(Long commentId) throws Exception{
        Comment comentario = commentRepository.findById(commentId).orElseThrow(() -> new Exception("Comentario no encontrado"));

        User autor = comentario.getAutor();
        User user = userRepository.findById(autor.getId()).orElseThrow(() -> new Exception("Usuario no encontrado"));
        
        //if (user.getRol().equals("Profesor")){
        //    throw new Exception("No se puede resolver un comentario creado por un profesor.");
        //}

        CommentModification modificationEC = new CommentModification();
        modificationEC.setState(CommentState.RESUELTO);
        modificationEC.setComentario(comentario);
        commentModificationRepository.save(modificationEC);

        comentario.getModificacionEC().add(modificationEC);

        return commentRepository.save(comentario);
    }
    
    @Override
    public Page findAllPageable(Pageable pageable) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
    }
    
}