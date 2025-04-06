package com.makisanTech.saltaFan.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Embeddable
public class Price {
    private Double price;
    private String description;
}
