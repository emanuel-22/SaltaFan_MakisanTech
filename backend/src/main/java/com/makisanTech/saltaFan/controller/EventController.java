package com.makisanTech.saltaFan.controller;

import com.makisanTech.saltaFan.dto.EventDTO;
import com.makisanTech.saltaFan.dto.request.EventRequestDTO;
import com.makisanTech.saltaFan.dto.response.EventPreviewDTO;
import com.makisanTech.saltaFan.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("events")
public class EventController {

    @Autowired
    EventService service;

    @GetMapping("/")
    public List<EventPreviewDTO> getEvents() {
        return service.getEvents();
    }

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveEvent(@RequestPart("event") EventRequestDTO event,
                                       @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.save(event, image));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/filter")
    public List<EventPreviewDTO> getFilteredEvents(
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) List<String> types) {
        return service.getFilteredEvents(categories, date, types);
    }


    @GetMapping("/{id}")
    public EventDTO getEventByID(@PathVariable Long id) {
        return service.getEventByID(id);
    }

    @GetMapping("/organizer/{idOrganizer}")
    public List<EventPreviewDTO> getLastThreeEventsByOrganizer(@PathVariable Long idOrganizer) {
        return service.getEventsByOrganizer(idOrganizer);
    }

    @GetMapping("/last")
    public List<EventPreviewDTO> getEventsByDateDesc() {
        return service.getEventsByDateDesc();
    }

    @GetMapping("/user/{userId}/interests")
    public List<EventPreviewDTO> getEventsByUserInterests(@PathVariable Long userId) {
        return service.getEventsByUserInterests(userId);
    }
}
