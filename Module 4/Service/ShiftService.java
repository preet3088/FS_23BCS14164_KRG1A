package org.example.vmsbackend.Service;

import org.example.vmsbackend.Model.*;
import org.example.vmsbackend.Repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShiftService {

    private final ShiftRepository shiftRepo;
    private final EventRepository eventRepo;
    private final ShiftAssignmentRepository assignmentRepo;
    private final UserRepository userRepo;

    public ShiftService(ShiftRepository shiftRepo, EventRepository eventRepo,
                        ShiftAssignmentRepository assignmentRepo, UserRepository userRepo) {
        this.shiftRepo = shiftRepo;
        this.eventRepo = eventRepo;
        this.assignmentRepo = assignmentRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public Shift createShift(Long eventId, LocalDateTime start, LocalDateTime end, Integer capacity, String requiredSkills) {
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        Shift s = new Shift();
        s.setEvent(event);
        s.setStartTime(start);
        s.setEndTime(end);
        s.setCapacity(capacity);
        s.setRequiredSkills(requiredSkills);
        return shiftRepo.save(s);
    }

    public List<Shift> listByEvent(Long eventId) {
        return shiftRepo.findByEventId(eventId);
    }

    @Transactional
    public ShiftAssignment enroll(Long shiftId, Long volunteerUserId) {
        Shift shift = shiftRepo.findById(shiftId).orElseThrow(() -> new IllegalArgumentException("Shift not found"));
        User volunteer = userRepo.findById(volunteerUserId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        validateCapacity(shiftId, shift.getCapacity());
        validateOverlap(volunteer.getId(), shift.getStartTime(), shift.getEndTime());

        ShiftAssignment sa = new ShiftAssignment();
        sa.setShift(shift);
        sa.setVolunteer(volunteer);
        sa.setStatus(ShiftAssignment.Status.ENROLLED);
        return assignmentRepo.save(sa);
    }

    @Transactional
    public ShiftAssignment assign(Long shiftId, Long volunteerUserId) {
        ShiftAssignment sa = enroll(shiftId, volunteerUserId);
        sa.setStatus(ShiftAssignment.Status.ASSIGNED);
        return assignmentRepo.save(sa);
    }

    private void validateCapacity(Long shiftId, Integer capacity) {
        long count = assignmentRepo.countByShiftId(shiftId);
        if (capacity != null && count >= capacity) {
            throw new IllegalStateException("Shift capacity reached");
        }
    }

    private void validateOverlap(Long volunteerId, LocalDateTime newStart, LocalDateTime newEnd) {
        if (!assignmentRepo.findOverlaps(volunteerId, newStart, newEnd).isEmpty()) {
            throw new IllegalStateException("Shift overlaps with an existing assignment");
        }
    }
}
