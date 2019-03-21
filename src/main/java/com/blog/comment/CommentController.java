package com.blog.comment;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringEscapeUtils;


@RestController
public class CommentController {
	@Autowired
	CommentDao cd;
	@Autowired
	CommentService cs;
	
	@PostMapping("commentList")
	public List<HashMap<String,Object>> commentList(@RequestBody HashMap<String,String> seq){
		if(!ObjectUtils.isEmpty(seq)) {
			return cd.commentList(seq.get("seq"));
		}else {
			return null;
		}
	}
	@PostMapping("commentCount")
	public String commentCount(@RequestBody HashMap<String,String> seq) {
		if(!ObjectUtils.isEmpty(seq)) {
			return cd.commentCount(seq.get("seq"));
		}else {
			return null;
		}
	}
	@PostMapping("commentWrite")
	public boolean commentWrite(@RequestBody HashMap<String,String> param) {
		for( String key : param.keySet()){
			if(!StringUtils.isEmpty(param.get(key))&&!StringUtils.isBlank(param.get(key))) {
				param.put(key,StringEscapeUtils.unescapeHtml4(param.get(key)));
			}else {
				return false;
			}		
		}
		cs.commentWrite(param);
		return true;
		
		
		
	}
}
