package com.makisanTech.saltaFan.mapper;

import com.makisanTech.saltaFan.dto.LocationDTO;
import com.makisanTech.saltaFan.model.Location;
import org.mapstruct.Mapper;

@Mapper
public interface LocationMapper {
    LocationDTO toLocationDTO(Location location);

    Location toLocation(LocationDTO locationDTO);
}
