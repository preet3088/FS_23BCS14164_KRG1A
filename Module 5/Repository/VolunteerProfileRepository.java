package org.example.vmsbackend.Repository;
import org.example.vmsbackend.Model.VolunteerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VolunteerProfileRepository extends JpaRepository<VolunteerProfile, Long> {
    Optional<VolunteerProfile> findByUserId(Long userId);
}
