package com.benkynote.benkynote.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.benkynote.benkynote.models.StudySessionTime;


public interface StudySessionTimeRepository extends BaseRepository<StudySessionTime, Long> {
}