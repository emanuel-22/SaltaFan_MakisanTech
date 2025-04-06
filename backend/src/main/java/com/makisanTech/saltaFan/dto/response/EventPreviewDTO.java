package com.makisanTech.saltaFan.dto.response;

import com.makisanTech.saltaFan.dto.CategoryDTO;
import com.makisanTech.saltaFan.dto.LocationDTO;
import com.makisanTech.saltaFan.dto.ScheduleDTO;

import java.util.List;

public record EventPreviewDTO(
        Long id,
        String name,
        String flyer,
        List<ScheduleDTO> schedule,
        LocationDTO location,
        CategoryDTO category,
        OrganizerPreviewDTO organizer
) {
}
