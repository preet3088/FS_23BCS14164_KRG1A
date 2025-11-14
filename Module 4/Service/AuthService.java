package org.example.vmsbackend.Service;

import org.example.vmsbackend.Model.User;
import org.example.vmsbackend.Model.VolunteerProfile;
import org.example.vmsbackend.Requests.LoginRequest;
import org.example.vmsbackend.Requests.RegisterRequest;
import org.example.vmsbackend.Repository.UserRepository;
import org.example.vmsbackend.Repository.VolunteerProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final VolunteerProfileRepository profileRepository;

    public AuthService(UserRepository userRepository, VolunteerProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional
    public User register(RegisterRequest req) {
        if (userRepository.findByEmail(req.email).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = new User();
        user.setEmail(req.email);
        user.setPasswordHash(req.password); // TODO: hash later
        user.setRole(User.Role.VOLUNTEER);
        user = userRepository.save(user);

        VolunteerProfile vp = new VolunteerProfile();
        vp.setUser(user);
        vp.setName(req.name);
        vp.setPhone(req.phone);
        profileRepository.save(vp);
        return user;
    }

    public User login(LoginRequest req) {
        return userRepository.findByEmail(req.email)
                .filter(u -> u.getPasswordHash().equals(req.password))
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
    }
}
