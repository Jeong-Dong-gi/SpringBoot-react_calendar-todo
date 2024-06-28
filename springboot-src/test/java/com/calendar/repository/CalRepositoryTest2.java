package com.calendar.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.calendar.dto.Cal;
import com.calendar.repository.CalRepository;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
class CalRepositoryTest2 {

	@Autowired
	CalRepository calRepository;
	
	@Test
	void Test() {
		for(Cal calDTO : calRepository.findByStartDay("2024-06-21")) {
			log.info(calDTO.toString());
		}
	}

}
