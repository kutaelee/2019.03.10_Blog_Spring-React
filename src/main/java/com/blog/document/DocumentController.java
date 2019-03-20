package com.blog.document;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DocumentController {
	@Autowired
	DocumentDao dd;
	
	@PostMapping("document")
	public HashMap<String,Object> document(@RequestBody HashMap<String,Object> document_seq){
		return dd.document((String)document_seq.get("seq"));
	}
	@PostMapping("latelyseq")
	public String latelySeq (@RequestBody HashMap<String,String> subject_seq) {
		
		return dd.latelySeq(subject_seq);
	}
}
