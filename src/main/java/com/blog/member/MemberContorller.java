package com.blog.member;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberContorller {
	@Autowired
	MemberDao md;
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping("login")
	public boolean login(@RequestBody HashMap<String, String> map,HttpSession session) {
		String memberPw=md.userInfo(map.get("id"));
		if(!StringUtils.isEmpty(memberPw)){
			if(passwordEncoder.matches(map.get("pw"), memberPw)) {
				session.setAttribute("login", true);
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}
	}
	@GetMapping("loginsessioncheck")
	public boolean loginSessionCheck(HttpSession session) {
		if(!ObjectUtils.isEmpty(session.getAttribute("login"))) {
			return true;
		}else {
			return false;
		}
	}
	@GetMapping("logout")
	public boolean logout(HttpSession session) {
		session.invalidate();
		return true;
	}
}
