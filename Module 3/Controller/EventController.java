package org.example.vmsbackend.Controller;

import jakarta.validation.Valid;
import org.example.vmsbackend.Model.Event;
import org.example.vmsbackend.Requests.EventCreateRequest;
import org.example.vmsbackend.Service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<Event> create(@Valid @RequestBody EventCreateRequest req) {
        Event e = new Event();
        e.setTitle(req.title);
        e.setDescription(req.description);
        e.setLocation(req.location);
        e.setStartDate(req.startDate);
        e.setEndDate(req.endDate);
        return ResponseEntity.status(201).body(eventService.create(e));
    }

    @GetMapping
    public ResponseEntity<List<Event>> list() {
        return ResponseEntity.ok(eventService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> get(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.get(id));
    }
}
