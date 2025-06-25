
package com.benkynote.benkynote.models;

import java.util.Date;

import org.springframework.data.relational.core.mapping.Table;

import com.benkynote.benkynote.enums.CommentState;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "CommentModification")
@Getter
@Setter
public class CommentModification extends Base {

    @Column(nullable = false)
    private Date fechaModificacionEC;

    @Enumerated(EnumType.STRING)
    private CommentState state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    @JsonBackReference("commet-modifications")
    private Comment comentario; 
}
