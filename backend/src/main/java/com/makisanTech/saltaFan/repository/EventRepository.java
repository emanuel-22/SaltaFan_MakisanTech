package com.makisanTech.saltaFan.repository;

import com.makisanTech.saltaFan.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {
    Optional<Event> findById(Long id);

    @Query(value = """
    SELECT e.*
    FROM event AS e
    JOIN (
        SELECT event_id, MAX(event_date) AS last_event_date
        FROM event_schedule
        GROUP BY event_id
    ) AS s ON e.id = s.event_id
    WHERE e.organizer_id = :organizerId
    ORDER BY s.last_event_date DESC
    LIMIT 3
    """, nativeQuery = true)
    List<Event> findLastThreeEventsByOrganizer(@Param("organizerId") Long organizerId);


    @Query(value = """
    SELECT e.* FROM event AS e
    JOIN event_schedule AS s ON e.id = s.event_id
    ORDER BY s.event_date DESC
    """, nativeQuery = true)
    List<Event> findEventsByDateDesc();


    @Query(value = """
            SELECT e.* FROM event e
            JOIN category c ON e.category_id = c.id
            JOIN interest i ON c.interest_id = i.id
            JOIN user_interest ui ON i.id = ui.interest_id
            WHERE ui.user_id = :userId
            """, nativeQuery = true)
    List<Event> findEventsByUserInterests(@Param("userId") Long userId);
}
