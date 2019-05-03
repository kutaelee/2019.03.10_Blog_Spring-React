package com.blog.visit;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VisitController {
	@Autowired
	VisitService vs;
	@Autowired
	VisitDao vd;
	
	@GetMapping("visitcount")
	public HashMap<String,Object> visitCount(HttpSession session) {
		
		if(ObjectUtils.isEmpty(session.getAttribute("visit"))){
			session.setAttribute("visit", true);
			vs.visit();
		}
	
		return vd.visitCount();
	}
	@GetMapping("browserListCheck")
	public boolean browserListCheck() {
		return true;
	}
}
