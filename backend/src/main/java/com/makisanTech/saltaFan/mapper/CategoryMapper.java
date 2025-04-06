package com.makisanTech.saltaFan.mapper;

import com.makisanTech.saltaFan.dto.CategoryDTO;
import com.makisanTech.saltaFan.model.Category;
import org.mapstruct.Mapper;

@Mapper
public interface CategoryMapper {
    CategoryDTO toCategoryDTO(Category category);

    Category toCategory(CategoryDTO categoryDTO);
}
