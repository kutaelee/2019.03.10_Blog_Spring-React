package com.blog.main;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping(value = "clock", produces = "aplication/text; charset=utf8")
	public @ResponseBody String hello() {
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyy년 MM월 dd일 a HH:mm:ss z");
		Date date = new Date();
		return dateformat.format(date) + "\n";
	}
	@GetMapping("document")
	public String document() {
		System.out.println("hi");
		return "document";
	}
}
