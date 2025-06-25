package com.benkynote.benkynote.services;

import java.sql.Date;
import java.util.regex.Pattern;

import org.hibernate.query.Page;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.models.Event;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.EventRepository;

@Service
public class EventServiceImpl extends BaseServiceImpl<Event, Long> implements EventService {
    
    private final EventRepository eventRepository;
    
    public EventServiceImpl(BaseRepository <Event, Long> baseRepository, EventRepository eventRepository){
        super(baseRepository);
        this.eventRepository= eventRepository;
   
    }
    
    @Override
    public Page findAllPageable(Pageable pageable) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
    }
    
}

   