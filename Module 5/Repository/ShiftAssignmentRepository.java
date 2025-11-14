package org.example.vmsbackend.Repository;

import org.example.vmsbackend.Model.ShiftAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface ShiftAssignmentRepository extends JpaRepository<ShiftAssignment, Long> {
    long countByShiftId(Long shiftId);

    @Query("""
    select sa from ShiftAssignment sa
    where sa.volunteer.id = :volunteerId
      and sa.shift.startTime < :newEnd
      and sa.shift.endTime   > :newStart
  """)
    List<ShiftAssignment> findOverlaps(Long volunteerId, LocalDateTime newStart, LocalDateTime newEnd);

    List<ShiftAssignment> findByVolunteerId(Long volunteerId);
}
