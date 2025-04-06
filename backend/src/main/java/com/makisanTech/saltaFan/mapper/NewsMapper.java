package com.makisanTech.saltaFan.mapper;

import com.makisanTech.saltaFan.dto.response.NewsDTO;
import com.makisanTech.saltaFan.dto.response.NewsPreviewDTO;
import com.makisanTech.saltaFan.model.News;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = { OrganizerMapper.class })
public interface NewsMapper {

    NewsMapper mapper = Mappers.getMapper(NewsMapper.class);

    NewsDTO toNewsDTO(News news);

    News toDTO(NewsDTO newsDTO);

    NewsPreviewDTO toNewsPreviewDTO(News news);

}
