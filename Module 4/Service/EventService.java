package org.example.vmsbackend.Service;

import org.example.vmsbackend.Model.Event;
import org.example.vmsbackend.Repository.EventRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepo;
    public EventService(EventRepository eventRepo) { this.eventRepo = eventRepo; }
    public Event create(Event e) { return eventRepo.save(e); }
    public List<Event> list() { return eventRepo.findAll(); }
    public Event get(Long id) { return eventRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Event not found")); }
}
