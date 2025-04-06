package com.makisanTech.saltaFan.dto.request;

import com.makisanTech.saltaFan.dto.CategoryDTO;
import com.makisanTech.saltaFan.dto.LocationDTO;
import com.makisanTech.saltaFan.dto.PriceDTO;
import com.makisanTech.saltaFan.dto.ScheduleDTO;
import com.makisanTech.saltaFan.dto.response.OrganizerDTO;

import java.util.List;

public record EventRequestDTO (
        String name,
        String subtitle,
        String description,
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
){}
