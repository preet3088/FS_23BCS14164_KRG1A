package org.example.vmsbackend.Requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ShiftCreateRequest {
    @NotNull
    public LocalDateTime startTime;
    @NotNull
    public LocalDateTime endTime;
    @NotNull @Min(1)
    public Integer capacity;
    public String requiredSkills;
}

