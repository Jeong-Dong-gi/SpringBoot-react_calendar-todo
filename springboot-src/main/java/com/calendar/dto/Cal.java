package com.calendar.dto;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Cal {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String title, detail, startDay, endDay ;
	private String[] doing;
	private boolean complete;
	
	public Cal(String title, String detail, String startDay, String endDay, String[] doing, boolean complete) {
		super();
		this.title = title;
		this.detail = detail;
		this.startDay = startDay;
		this.endDay = endDay;
		this.doing = doing;
		this.complete = complete;
	}
	
	
	
}
