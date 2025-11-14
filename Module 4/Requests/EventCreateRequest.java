package org.example.vmsbackend.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class EventCreateRequest {
    @NotBlank
    public String title;
    public String description;
    public String location;
    @NotNull
    public LocalDate startDate;
    @NotNull
    public LocalDate endDate;
}
