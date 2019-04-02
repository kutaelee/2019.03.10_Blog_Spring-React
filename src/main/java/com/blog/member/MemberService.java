package com.blog.member;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class MemberService {
	@Autowired
	MemberDao md;
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	public void memberInsert(HashMap<String,String> info) {
		String pw=info.get("pw");
		info.put("pw",passwordEncoder.encode(pw));
		md.memberInsert(info);
	}

}
