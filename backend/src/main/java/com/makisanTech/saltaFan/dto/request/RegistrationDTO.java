package com.makisanTech.saltaFan.dto.request;

public record RegistrationDTO(
        String name,
        String surname,
        String email,
        String password,
        String phone
) { }
