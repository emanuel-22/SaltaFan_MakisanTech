package com.makisanTech.saltaFan.mapper;

import com.makisanTech.saltaFan.dto.ScheduleDTO;
import com.makisanTech.saltaFan.model.Schedule;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ScheduleMapper {

    ScheduleMapper mapper = Mappers.getMapper(ScheduleMapper.class);

    ScheduleDTO toScheduleDTO(Schedule schedule);

    Schedule toSchedule(ScheduleDTO scheduleDTO);
}
