package com.benkynote.benkynote.dto;

import com.benkynote.benkynote.enums.StudySessionState;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudySessionDTO {
    private Long id;
    private String studySessionName;
    private StudySessionState status;
}
