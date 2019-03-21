package com.blog.comment;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public class CommentService {
	@Autowired
	CommentDao cd;
	
	public void commentWrite(HashMap<String, String> param) {
		cd.commentWrite(param);
	}
	
}
