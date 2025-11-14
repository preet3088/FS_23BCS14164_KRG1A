package org.example.vmsbackend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@Entity
@Table(name = "shift_assignments",
        uniqueConstraints = @UniqueConstraint(columnNames = {"shift_id", "volunteer_id"}),
        indexes = {
                @Index(name = "idx_assignment_shift", columnList = "shift_id"),
                @Index(name = "idx_assignment_volunteer", columnList = "volunteer_id")
        })
public class ShiftAssignment {

    public enum Status { ENROLLED, ASSIGNED }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "shift_id", nullable = false)
    private Shift shift;

    @ManyToOne(optional = false)
    @JoinColumn(name = "volunteer_id", nullable = false)
    private User volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.ENROLLED;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

}
