package com.benkynote.benkynote.services;

import com.benkynote.benkynote.dto.ExamDTO;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.models.Exam;

public interface ExamService extends BaseService<Exam, Long> {
    
    Exam createExam(User user, ExamDTO examDTO) throws Exception;
    Exam deleteExam(Long examId) throws Exception;
}
