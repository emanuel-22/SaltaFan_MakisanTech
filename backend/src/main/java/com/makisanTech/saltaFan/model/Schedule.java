package com.makisanTech.saltaFan.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@RequiredArgsConstructor

@Embeddable
public class Schedule {
    @Column(name = "event_date")
    private LocalDate date;
    @Column(name = "event_time")
    private LocalTime time;
}
