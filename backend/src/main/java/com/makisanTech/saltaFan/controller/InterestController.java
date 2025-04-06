package com.makisanTech.saltaFan.controller;

import com.makisanTech.saltaFan.dto.InterestDTO;
import com.makisanTech.saltaFan.repository.UserInterestRepository;
import com.makisanTech.saltaFan.service.UserInterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("interests")
public class InterestController {

    @Autowired
    private UserInterestService userInterestService;

    @Autowired
    private UserInterestRepository userInterestRepository;

    @GetMapping("/")
    public List<InterestDTO> getInterests() {
        return userInterestService.getInterests();
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Void> subscribeToInterests(
            @PathVariable Long userId,
            @RequestBody List<Long> interestIds) {
        userInterestService.subscribeToInterests(userId, interestIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public List<InterestDTO> getInterestsByUserID(@PathVariable Long userId) {
        return userInterestService.getInterestsByUserID(userId);
    }
}
