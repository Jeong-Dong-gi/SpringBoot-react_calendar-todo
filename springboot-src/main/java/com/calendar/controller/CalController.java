package com.calendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calendar.dto.Cal;
import com.calendar.repository.CalRepository;

@RestController
public class CalController {

	@Autowired
	private CalRepository calRepository;
	
	@GetMapping("/cal")
	public Iterable<Cal> getCalTodo() {
		return calRepository.findAll();
	}
}
