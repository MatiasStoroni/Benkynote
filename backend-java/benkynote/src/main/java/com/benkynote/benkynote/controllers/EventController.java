package com.benkynote.benkynote.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.benkynote.benkynote.models.Calendar;
import com.benkynote.benkynote.models.Event;
import com.benkynote.benkynote.models.User;
import com.benkynote.benkynote.services.CalendarServiceImpl;
import com.benkynote.benkynote.services.EventServiceImpl;
import com.benkynote.benkynote.services.UserServiceImpl;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/users/{userId}/events")
public class EventController {
    @Autowired
    private UserServiceImpl usuarioService;

    @Autowired
    private EventServiceImpl eventService;

    @Autowired
    private CalendarServiceImpl calendarService;

    @GetMapping
    public ResponseEntity<?> getEventsByUserId(@PathVariable Long userId) throws Exception {
        try {
            User user = usuarioService.findById(userId);
            List<Event> events = user.getCalendario().getEvents();
            return ResponseEntity.status(HttpStatus.OK).body(events);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@Valid @RequestBody Event event, BindingResult bindingResult,
            @PathVariable Long userId) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        try {
            Event newEvent = new Event();
            newEvent.setNombre(event.getNombre());
            newEvent.setDescripcion(event.getDescripcion());
            newEvent.setFechaHoraInicio(event.getFechaHoraInicio());
            newEvent.setFechaHoraFinal(event.getFechaHoraFinal());

            // asignar al calendario
            User user = usuarioService.findById(userId);
            Calendar calendar = user.getCalendario();

            // Agregar el evento al calendario
            calendar.getEvents().add(event);

            // Guardo el calendario (tambien persiste el evento)
            calendarService.update(calendar.getId(), calendar);

            return ResponseEntity.status(HttpStatus.CREATED).body(newEvent);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"Error. Por favor intente más tarde.\"}");
        }
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<?> updateEventByUserId(@PathVariable Long userId,
            @PathVariable Long eventId,
            @RequestBody Event updatedEvent) throws Exception {

        try {
            User user = usuarioService.findById(userId);
            List<Event> events = user.getCalendario().getEvents();

            // Find the event by eventId
            Event eventToUpdate = events.stream()
                    .filter(event -> event.getId().equals(eventId))
                    .findFirst()
                    .orElseThrow(() -> new Exception("Event not found"));

            // Update the event details
            eventToUpdate.setNombre(updatedEvent.getNombre());
            eventToUpdate.setFechaHoraInicio(updatedEvent.getFechaHoraInicio());
            eventToUpdate.setFechaHoraFinal(updatedEvent.getFechaHoraFinal());
            eventToUpdate.setDescripcion(updatedEvent.getDescripcion());
            // Add other fields as needed

            // Save the updated user and events (assuming it's done via usuarioService)
            eventService.update(eventToUpdate.getId(), eventToUpdate);

            return ResponseEntity.status(HttpStatus.OK).body(eventToUpdate);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @DeleteMapping("/{eventId}")
    public void deleteEventByUserIdAndEventId(@PathVariable Long userId, @PathVariable Long eventId) throws Exception {

        System.out.println("------------------------------------------------------------------");
        System.out.println(userId);
        System.out.println(eventId);
        System.out.println("------------------------------------------------------------------");

        // Fetch the calendar associated with the user
        User user = usuarioService.findById(userId);
        Calendar calendar = user.getCalendario();

        // Get the list of events
        List<Event> events = calendar.getEvents();

        // Find and remove the event
        Event eventToDelete = events.stream()
                .filter(event -> event.getId().equals(eventId))
                .findFirst()
                .orElseThrow(() -> new Exception("Event not found"));

        // Remove the event from the list (this will trigger orphan removal)
        events.remove(eventToDelete);

        // Save the calendar to persist the changes
        calendarService.save(calendar);
    }
}
