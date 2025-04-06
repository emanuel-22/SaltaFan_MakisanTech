package com.makisanTech.saltaFan.dto;
import com.makisanTech.saltaFan.dto.response.OrganizerDTO;

import java.util.List;

public record EventDTO(
        Long id,
        String name,
        String subtitle,
        String description,
        String flyer,
        int age,
        int edition,
        boolean accessibility,
        String urlTicket,
        String type,
        List<PriceDTO> prices,
        List<ScheduleDTO> schedule,
        LocationDTO location,
        String nameLocation,
        String address,
        CategoryDTO category,
        OrganizerDTO organizer
) { }
