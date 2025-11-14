package org.example.vmsbackend.Controller;

import jakarta.validation.Valid;
import org.example.vmsbackend.Requests.AuthResponse;
import org.example.vmsbackend.Requests.LoginRequest;
import org.example.vmsbackend.Requests.RegisterRequest;
import org.example.vmsbackend.Service.AuthService;
import org.example.vmsbackend.Model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        User u = authService.register(req);
        return ResponseEntity.status(201).body(new AuthResponse("registered", u.getId(), u.getRole().name()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        User u = authService.login(req);
        return ResponseEntity.ok(new AuthResponse("logged-in", u.getId(), u.getRole().name()));
    }
}
