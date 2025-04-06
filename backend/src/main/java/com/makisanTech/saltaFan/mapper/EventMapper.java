package com.makisanTech.saltaFan.mapper;
import com.makisanTech.saltaFan.dto.EventDTO;
import com.makisanTech.saltaFan.dto.response.EventPreviewDTO;
import com.makisanTech.saltaFan.model.Event;
import com.makisanTech.saltaFan.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;


@Mapper(uses = {PriceMapper.class, ScheduleMapper.class, LocationMapper.class, CategoryMapper.class, OrganizerMapper.class})
public interface EventMapper {
    EventMapper mapper = Mappers.getMapper(EventMapper.class);

    @Mapping(source = "flyer", target = "flyer", qualifiedByName = "imageToString")
    EventDTO toEventDTO(Event event);

    @Mapping(source = "flyer", target = "flyer", qualifiedByName = "stringToImage")
    Event toEvent(EventDTO eventDTO);

    @Mapping(source = "flyer", target = "flyer", qualifiedByName = "imageToString")
    EventPreviewDTO toEventPreviewDTO(Event event);

    @Named("imageToString")
    default String imageToString(Image image) {
        return image != null ? image.getUrl() : null;
    }

    @Named("stringToImage")
    default Image stringToImage(String url) {
        if (url == null) {
            return null;
        }
        Image image = new Image();
        image.setUrl(url);
        return image;
    }
}
