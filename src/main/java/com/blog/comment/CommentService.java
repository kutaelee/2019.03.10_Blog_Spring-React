package com.blog.comment;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class CommentService {
	@Autowired
	CommentDao cd;
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	public void commentWrite(HashMap<String, String> map) {
		map.put("pw",passwordEncoder.encode(map.get("pw")));
		cd.commentWrite(map);
	}

	public boolean passwordCheck(HashMap<String, String> map) {
		String pw=cd.getPassword(map.get("seq"));
		if(passwordEncoder.matches(map.get("pw"),pw)) {
			return true;
		}else {
			return false;
		}
	}

	public void commentModify(HashMap<String, String> map) {
		cd.commentModify(map);
	}

	public void commentDelete(String seq) {
		cd.commentDelete(seq);
	}
	
}
