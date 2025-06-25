package com.benkynote.benkynote.services;

import com.benkynote.benkynote.models.Comment;

public interface CommentService extends BaseService <Comment, Long> {
    Comment createComment (String comentarioTexto, Long userId, Long noteId) throws Exception;
    Comment respondComment(Long commentId, Long userId, String respuesta) throws Exception;
}
