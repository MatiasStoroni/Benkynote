package com.benkynote.benkynote.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "CommentResponse")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentResponse extends Base {
    @Column(nullable = false)
    private String contenidoRespuesta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-Respuestas")
    private User autorRespuesta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    @JsonBackReference("comment-responses")
    private Comment comentario;
}
