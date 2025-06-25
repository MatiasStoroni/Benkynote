package com.benkynote.benkynote.services;

import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.models.Profile;
import com.benkynote.benkynote.models.Subject;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.ProfileRepository;
import com.benkynote.benkynote.repositories.SubjectRepository;



@Service
public class SubjectServiceImpl extends BaseServiceImpl<Subject, Long> implements SubjectService {
   
  @Autowired
  private final SubjectRepository subjectRepository;

  public SubjectServiceImpl(BaseRepository<Subject, Long> baseRepository, SubjectRepository subjectRepository) {
    super(baseRepository);
    this.subjectRepository = subjectRepository;
    
  }
  


  
  
  @Override
  public Page findAllPageable(Pageable pageable) throws Exception {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
  }
  
}