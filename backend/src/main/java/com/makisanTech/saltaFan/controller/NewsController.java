package com.makisanTech.saltaFan.controller;

import com.makisanTech.saltaFan.dto.response.NewsDTO;
import com.makisanTech.saltaFan.dto.response.NewsPreviewDTO;
import com.makisanTech.saltaFan.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("news")
public class NewsController {

    @Autowired
    NewsService service;

    @GetMapping("/")
    public List<NewsPreviewDTO> getNews(){
        return service.getNews();
    }

    @GetMapping("/{id}")
    public NewsDTO getNewByID(@PathVariable Long id) {
        return service.getNewByID(id);
    }
}
