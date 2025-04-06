package com.makisanTech.saltaFan.repository;

import com.makisanTech.saltaFan.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
}
