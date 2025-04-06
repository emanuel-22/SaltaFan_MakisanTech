package com.makisanTech.saltaFan.mapper;

import com.makisanTech.saltaFan.dto.response.OrganizerDTO;
import com.makisanTech.saltaFan.dto.response.OrganizerPreviewDTO;
import com.makisanTech.saltaFan.model.Organizer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrganizerMapper {

    OrganizerMapper mapper = Mappers.getMapper(OrganizerMapper.class);

    OrganizerDTO toOrganizerDTO(Organizer organizer);

    Organizer toOrganizer(OrganizerDTO organizerDTO);

    OrganizerPreviewDTO toOrganizerPreviewDTO(Organizer organizer);
}
