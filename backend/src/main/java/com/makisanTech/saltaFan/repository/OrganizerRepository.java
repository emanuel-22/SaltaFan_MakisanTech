package com.makisanTech.saltaFan.repository;

import com.makisanTech.saltaFan.model.Organizer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizerRepository extends JpaRepository<Organizer, Long> {
}
