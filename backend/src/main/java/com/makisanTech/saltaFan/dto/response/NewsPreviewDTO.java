package com.makisanTech.saltaFan.dto.response;

public record NewsPreviewDTO(
        Long id,
        String title,
        String image,
        String description,
        OrganizerPreviewDTO author
) {
}
