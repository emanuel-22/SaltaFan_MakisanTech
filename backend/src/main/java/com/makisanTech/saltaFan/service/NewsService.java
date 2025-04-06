package com.makisanTech.saltaFan.service;

import com.makisanTech.saltaFan.dto.response.NewsDTO;
import com.makisanTech.saltaFan.dto.response.NewsPreviewDTO;
import com.makisanTech.saltaFan.exception.ResourceNotFoundException;
import com.makisanTech.saltaFan.mapper.NewsMapper;
import com.makisanTech.saltaFan.model.News;
import com.makisanTech.saltaFan.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository repository;


    public List<NewsPreviewDTO> getNews() {
        return repository.findAll()
                .stream()
                .map(NewsMapper.mapper::toNewsPreviewDTO)
                .toList();
    }

    public NewsDTO getNewByID(Long id) {

        News news = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found with ID: " + id));

        return NewsMapper.mapper.toNewsDTO(news);
    }
}
