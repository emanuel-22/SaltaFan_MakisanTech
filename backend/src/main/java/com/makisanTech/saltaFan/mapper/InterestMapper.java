package com.makisanTech.saltaFan.mapper;

import com.makisanTech.saltaFan.dto.InterestDTO;
import com.makisanTech.saltaFan.model.Interest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InterestMapper {
    InterestDTO toInterestDTO(Interest interest);

    Interest toInterest(InterestDTO interestDTO);
}
