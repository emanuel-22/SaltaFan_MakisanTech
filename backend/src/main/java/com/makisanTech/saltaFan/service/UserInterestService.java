package com.makisanTech.saltaFan.service;

import com.makisanTech.saltaFan.dto.InterestDTO;
import com.makisanTech.saltaFan.mapper.InterestMapper;
import com.makisanTech.saltaFan.model.User;
import com.makisanTech.saltaFan.model.Interest;
import com.makisanTech.saltaFan.repository.UserInterestRepository;
import com.makisanTech.saltaFan.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInterestService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInterestRepository userInterestRepository;

    @Autowired
    private InterestMapper interestMapper;

    public void subscribeToInterests(Long userId, List<Long> interestIds) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Interest> interests = userInterestRepository.findAllById(interestIds);

        user.getInterests().addAll(interests);

        userRepository.save(user);
    }

    public List<InterestDTO> getInterests() {
        return userInterestRepository.findAll()
                .stream()
                .map(interestMapper::toInterestDTO)
                .toList();
    }

    public List<InterestDTO> getInterestsByUserID(Long userId) {
        return userInterestRepository.findByUserID(userId)
                .stream()
                .map(interestMapper::toInterestDTO)
                .toList();
    }
}
