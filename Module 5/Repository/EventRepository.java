package org.example.vmsbackend.Repository;

import org.example.vmsbackend.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> { }
