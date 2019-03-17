package com.blog.subject;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
public class SubjectController {
	@Autowired
	SubjectDao sd;
	@Autowired
	SubjectService ss;
	
	@GetMapping("lastsubjectseq")
	public @ResponseBody Integer lastSubjectSeq() {
		//추가할 주제의 고유번호
		return sd.lastSubjectSeq()+1;
	}
	@PostMapping("subject/*")
	public void insertSubject(MultipartHttpServletRequest req) throws IllegalStateException, IOException {
		
		HashMap<String,String> map= new HashMap<>();
		map.put("subjectName",req.getParameter("subjectName"));
		MultipartFile file=req.getFile("img");
		ss.insertSubject(map,file);
	}
	@GetMapping("getsubject")
	public List<HashMap<String,Object>> getSubject() {
		return sd.getSubject();
	}
}
