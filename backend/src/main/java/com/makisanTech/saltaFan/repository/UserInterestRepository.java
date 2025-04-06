package com.makisanTech.saltaFan.repository;

import com.makisanTech.saltaFan.model.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInterestRepository extends JpaRepository<Interest, Long> {

    /*
    @Query(value = "SELECT i.* FROM interest i " +
            "JOIN user_interest ui ON i.id = ui.interest_id " +
            "WHERE ui.user_id = :userId", nativeQuery = true)
     */
    @Query("SELECT u.interests FROM User u WHERE u.id = :userId")
    List<Interest> findByUserID(@Param("userId") Long userId);
}
