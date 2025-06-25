package com.benkynote.benkynote.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Comment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comment extends Base{
    @Column(nullable = false)
    private String contenidoComentario;

    @OneToMany(mappedBy = "comentario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("comment-responses")
    private List<CommentResponse> respuestas = new ArrayList<>();

    @OneToMany(mappedBy = "comentario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("commet-modifications")
    private List<CommentModification> modificacionEC = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-comments")
    private User autor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_content_id")
    @JsonBackReference("content-comment")
    private NoteContent comentarioApunte;
}
