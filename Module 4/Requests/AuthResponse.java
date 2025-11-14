package org.example.vmsbackend.Requests;

public class AuthResponse {
    public String message;
    public Long userId;
    public String role;

    public AuthResponse(String message, Long userId, String role) {
        this.message = message;
        this.userId = userId;
        this.role = role;
    }
}
