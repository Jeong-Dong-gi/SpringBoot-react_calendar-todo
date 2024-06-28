package com.calendar.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.calendar.dto.Cal;
import com.calendar.repository.CalRepository;

@SpringBootTest
class CalRepositoryTest {

	@Autowired
	CalRepository calRepository;
	
	String [] doing = {"2024-06-21", "2024-06-22", "2024-06-23"};
	
	@Test
	void putCalTodo() {
		Cal calenderTodo = new Cal("테스트", "테스트 중입니다.", "2024-06-21", "2024-06-23", doing, false);
		calRepository.save(calenderTodo);
	}

}
