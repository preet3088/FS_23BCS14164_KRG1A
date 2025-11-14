package org.example.vmsbackend.Requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank @Size(max = 120)
    public String name;

    @NotBlank @Email @Size(max = 150)
    public String email;

    @NotBlank @Size(min = 6, max = 100)
    public String password;

    @Size(max = 30)
    public String phone;
}

