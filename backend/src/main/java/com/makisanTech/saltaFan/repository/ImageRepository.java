package com.makisanTech.saltaFan.repository;

import com.makisanTech.saltaFan.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByOrderById();
}
