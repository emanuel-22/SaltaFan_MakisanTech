package com.makisanTech.saltaFan.service;
import com.makisanTech.saltaFan.dto.EventDTO;
import com.makisanTech.saltaFan.dto.request.EventRequestDTO;
import com.makisanTech.saltaFan.dto.response.EventPreviewDTO;
import com.makisanTech.saltaFan.exception.ResourceNotFoundException;
import com.makisanTech.saltaFan.mapper.EventMapper;
import com.makisanTech.saltaFan.mapper.ScheduleMapper;
import com.makisanTech.saltaFan.model.*;
import com.makisanTech.saltaFan.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    @Autowired
    EventRepository repository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    OrganizerRepository organizerRepository;

    @Autowired
    ImageService imageService;

    public List<EventPreviewDTO> getEvents() {
        return repository.findAll()
                .stream()
                .map(EventMapper.mapper::toEventPreviewDTO)
                .toList();
    }

    public EventDTO getEventByID(long id){
        Event event = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + id));

        return EventMapper.mapper.toEventDTO(event);
    }

    public List<EventPreviewDTO> getEventsByOrganizer(Long idOrganizer) {
        return repository.findLastThreeEventsByOrganizer(idOrganizer)
                .stream()
                .map(EventMapper.mapper::toEventPreviewDTO)
                .toList();
    }

    public List<EventPreviewDTO> getEventsByDateDesc() {
        return repository.findEventsByDateDesc()
                .stream()
                .map(EventMapper.mapper::toEventPreviewDTO)
                .toList();
    };

    public List<EventPreviewDTO> getEventsByUserInterests(Long userId) {
        return repository.findEventsByUserInterests(userId)
                .stream()
                .map(EventMapper.mapper::toEventPreviewDTO)
                .toList();
    }

    public List<EventPreviewDTO> getFilteredEvents(List<String> categories, String date, List<String> type) {
        Specification<Event> spec = Specification.where(null);

        if (categories != null && !categories.isEmpty()) {
            spec = spec.and(filterByCategory(categories));
        }

        if (date != null) {
            spec = spec.and(filterByDate(date));
        }

        if (type != null && !type.isEmpty()) {
            spec = spec.and(filterByEventType(type));
        }

        return repository.findAll(spec)
                .stream()
                .map(EventMapper.mapper::toEventPreviewDTO)
                .toList();
    }

    private Specification<Event> filterByDate(String date) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = null;
        LocalDate endDate = null;
        date = date.toUpperCase();

        switch (date) {
            case "HOY" -> {
                startDate = today;
                endDate = today;
            }
            case "SEMANA" -> {
                startDate = today.with(DayOfWeek.MONDAY);
                endDate = today.with(DayOfWeek.SUNDAY);
            }
            case "MES" -> {
                startDate = today.withDayOfMonth(1);
                endDate = today.withDayOfMonth(today.lengthOfMonth());
            }
        }

        if (startDate != null && endDate != null) {
            LocalDate finalStartDate = startDate;
            LocalDate finalEndDate = endDate;
            return (root, query, criteriaBuilder) -> criteriaBuilder.between(
                    root.join("schedule").get("date"), finalStartDate, finalEndDate);
        }

        return null;
    }

    private Specification<Event> filterByCategory(List<String> category) {
        return (root, query, criteriaBuilder) -> root.get("category").get("name").in(category);
    }

    private Specification<Event> filterByEventType(List<String> type) {
        return (root, query, criteriaBuilder) -> root.get("type").in(type);
    }


    public EventDTO save(EventRequestDTO eventDTO, MultipartFile imageFile) throws IOException {
        Event event = new Event();

        event.setName(eventDTO.name());
        event.setSubtitle(eventDTO.subtitle());
        event.setDescription(eventDTO.description());
        event.setAge(eventDTO.age());
        event.setEdition(eventDTO.edition());
        event.setAccessibility(eventDTO.accessibility());
        event.setUrlTicket(eventDTO.urlTicket());
        event.setType(eventDTO.type());
        event.setNameLocation(eventDTO.nameLocation());
        event.setAddress(eventDTO.address());


        if (eventDTO.category() != null) {
            Category category = categoryRepository.findById(eventDTO.category().id())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            event.setCategory(category);
        }

        if (eventDTO.organizer() != null) {
            Organizer organizer = organizerRepository.findById(eventDTO.organizer().id())
                    .orElseThrow(() -> new RuntimeException("Organizer not found"));
            event.setOrganizer(organizer);
        }


        if (eventDTO.location() != null) {
            Location location = locationRepository.findById(eventDTO.location().id())

                    .orElseGet(() -> new Location(
                            eventDTO.location().province(),
                            eventDTO.location().city()
                    ));

            event.setLocation(location);
        }


        if (eventDTO.schedule() != null && !eventDTO.schedule().isEmpty()) {
            List<Schedule> schedules = eventDTO.schedule()
                    .stream()
                    .map(ScheduleMapper.mapper::toSchedule)
                    .toList();

            event.setSchedule(schedules);
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            Image image = imageService.save(imageFile);
            event.setFlyer(image);
        }

        Event savedEvent = repository.save(event);

        return EventMapper.mapper.toEventDTO(savedEvent);
    }
}
