package com.makisanTech.saltaFan.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter

@Entity
public class Organizer extends User{
    private String organization;
    private String dni;
    private String biography;

    @Column(name = "social_media")
    private String socialMedia;

    @OneToMany(mappedBy = "organizer")
    private List<Event> events;

    @OneToMany(mappedBy = "author")
    private List<News> news;
}
