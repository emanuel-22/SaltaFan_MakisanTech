package com.makisanTech.saltaFan.mapper;

import com.makisanTech.saltaFan.dto.PriceDTO;
import com.makisanTech.saltaFan.model.Price;
import org.mapstruct.Mapper;


@Mapper
public interface PriceMapper {
    PriceDTO toPriceDTO(Price price);

    Price toPrice(PriceDTO priceDTO);
}
