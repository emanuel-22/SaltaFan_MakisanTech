package com.makisanTech.saltaFan.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String subtitle;
    private String description;
    private int age;
    private int edition;
    private boolean accessibility;
    @Column(name = "url_ticket")
    private String urlTicket;
    private String type;

    @OneToOne
    @JoinColumn(name = "flyer_id")
    private Image flyer;

    @ElementCollection
    @CollectionTable(name = "event_schedule", joinColumns = @JoinColumn(name = "event_id"))
    private List<Schedule> schedule;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @Column(name = "name_location")
    private String nameLocation;

    private String address;

    //private String address_url;

    @ElementCollection
    @Fetch(FetchMode.JOIN)
    private List<Price> prices;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private Organizer organizer;
}
