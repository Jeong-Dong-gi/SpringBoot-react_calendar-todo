package com.calendar.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.calendar.dto.Cal;

@CrossOrigin
public interface CalRepository extends JpaRepository<Cal, Long> {
	
	List<Cal> findByStartDay(String startDay);
}
