package org.example.vmsbackend.Controller;

import jakarta.validation.Valid;
import org.example.vmsbackend.Model.Shift;
import org.example.vmsbackend.Model.ShiftAssignment;
import org.example.vmsbackend.Requests.ShiftCreateRequest;
import org.example.vmsbackend.Service.ShiftService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ShiftController {

    private final ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @PostMapping("/api/events/{eventId}/shifts")
    public ResponseEntity<Shift> createShift(@PathVariable Long eventId,@Valid @RequestBody ShiftCreateRequest req) {
        Shift s = shiftService.createShift(eventId, req.startTime, req.endTime, req.capacity, req.requiredSkills);
        return ResponseEntity.status(201).body(s);
    }

    @GetMapping("/api/events/{eventId}/shifts")
    public ResponseEntity<List<Shift>> listByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(shiftService.listByEvent(eventId));
    }

    @PostMapping("/api/shifts/{shiftId}/enroll")
    public ResponseEntity<ShiftAssignment> enroll(@PathVariable Long shiftId, @RequestParam Long userId) {
        return ResponseEntity.ok(shiftService.enroll(shiftId, userId));
    }

    @PostMapping("/api/shifts/{shiftId}/assign")
    public ResponseEntity<ShiftAssignment> assign(@PathVariable Long shiftId, @RequestParam Long userId) {
        return ResponseEntity.ok(shiftService.assign(shiftId, userId));
    }
}
