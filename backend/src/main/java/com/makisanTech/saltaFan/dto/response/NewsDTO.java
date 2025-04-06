package com.makisanTech.saltaFan.dto.response;

import com.makisanTech.saltaFan.dto.CategoryDTO;

import java.time.LocalDateTime;

public record NewsDTO(
        Long id,
        String title,
        String image,
        String description,
        LocalDateTime date,
        String body,
        CategoryDTO category,
        OrganizerPreviewDTO author
) {
}
