package org.example.vmsbackend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@Entity
@Table(name = "users" ,uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {

    public enum Role {ADMIN,VOLUNTEER}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 200)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.VOLUNTEER;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

}
