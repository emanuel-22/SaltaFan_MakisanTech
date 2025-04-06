package com.makisanTech.saltaFan.dto.response;

import com.makisanTech.saltaFan.model.Role;

public record LoginResponseDTO(Long id, String name, String token, Role role) {
}
