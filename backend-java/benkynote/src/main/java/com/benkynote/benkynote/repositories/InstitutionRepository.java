package com.benkynote.benkynote.repositories;

import com.benkynote.benkynote.models.Institution;
import java.util.List;


public interface InstitutionRepository extends BaseRepository<Institution, Long> {

    Institution findByCorreoInstitucion(String correoInstitucion);
}