package org.example.vmsbackend.Service;

import org.example.vmsbackend.Model.User;
import org.example.vmsbackend.Model.VolunteerProfile;
import org.example.vmsbackend.Requests.ProfileUpdateRequest;
import org.example.vmsbackend.Repository.UserRepository;
import org.example.vmsbackend.Repository.VolunteerProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VolunteerService {

    private final UserRepository userRepo;
    private final VolunteerProfileRepository profileRepo;

    public VolunteerService(UserRepository userRepo, VolunteerProfileRepository profileRepo) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
    }

    public VolunteerProfile getMyProfile(Long userId) {
        return profileRepo.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
    }

    @Transactional
    public VolunteerProfile updateMyProfile(Long userId, ProfileUpdateRequest req) {
        VolunteerProfile vp = profileRepo.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
        vp.setName(req.name);
        vp.setPhone(req.phone);
        vp.setSkills(req.skills);
        vp.setAvailabilityText(req.availabilityText);
        return profileRepo.save(vp);
    }

    public User getByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
