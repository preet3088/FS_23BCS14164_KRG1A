package org.example.vmsbackend.Controller;

import jakarta.validation.Valid;
import org.example.vmsbackend.Model.VolunteerProfile;
import org.example.vmsbackend.Requests.ProfileUpdateRequest;
import org.example.vmsbackend.Service.VolunteerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @GetMapping("/me")
    public ResponseEntity<VolunteerProfile> getMe(@RequestParam Long userId) {
        return ResponseEntity.ok(volunteerService.getMyProfile(userId));
    }

    @PutMapping("/me")
    public ResponseEntity<VolunteerProfile> updateMe(@RequestParam Long userId, @Valid @RequestBody ProfileUpdateRequest req) {
        return ResponseEntity.ok(volunteerService.updateMyProfile(userId, req));
    }
}
