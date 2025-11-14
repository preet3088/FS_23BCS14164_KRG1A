package org.example.vmsbackend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "volunteer_profile")
public class VolunteerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 120)
    private String name;

    @Column(length = 30)
    private String phone;

    @Column(columnDefinition = "text")
    private String skills;

    @Column(columnDefinition = "text")
    private String availabilityText;


}
