package com.benkynote.benkynote.services;

import java.sql.Date;
import java.util.regex.Pattern;

import java.util.List;
import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.stereotype.Service;

import com.benkynote.benkynote.models.Calendar;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.models.Event;
import com.benkynote.benkynote.repositories.BaseRepository;
import com.benkynote.benkynote.repositories.CalendarRepository;
import com.benkynote.benkynote.services.UserServiceImpl;

@Service
public class CalendarServiceImpl extends BaseServiceImpl<Calendar, Long> implements CalendarService {

    private final CalendarRepository calendarRepository;

    public CalendarServiceImpl(BaseRepository<Calendar, Long> baseRepository, CalendarRepository calendarRepository) {
        super(baseRepository);
        this.calendarRepository = calendarRepository;

    }

    @Override
    public Page findAllPageable(Pageable pageable) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'findAllPageable'");
    }

    

}
