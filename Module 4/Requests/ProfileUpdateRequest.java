package org.example.vmsbackend.Requests;

import jakarta.validation.constraints.Size;

public class ProfileUpdateRequest {
    @Size(max = 120)
    public String name;

    @Size(max = 30)
    public String phone;

    public String skills;
    public String availabilityText;
}
