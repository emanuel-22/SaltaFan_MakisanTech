package com.makisanTech.saltaFan.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category")
    private List<Event> events;

    @ManyToOne
    @JoinColumn(name = "interest_id")
    private Interest interest;

    @OneToMany(mappedBy = "category")
    private List<News> news;
}
