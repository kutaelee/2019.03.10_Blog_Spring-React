package com.blog.document;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.subject.SubjectDao;

@RestController
public class DocumentController {
	@Autowired
	DocumentDao dd;
	@Autowired
	DocumentService ds;

	
	@PostMapping("document")
	public HashMap<String,Object> document(@RequestBody HashMap<String,Object> document_seq){
		return dd.document((String)document_seq.get("seq"));
	}

	@PostMapping("latelyseq")
	public String latelySeq (@RequestBody HashMap<String,String> map) {
		
		return dd.latelySeq(map.get("subject_seq").toString());
	}
	@PostMapping("documentwrite")
	public String documentWrite(@RequestBody HashMap<String,String> map) throws IOException {
		List<String> imgList = new ArrayList<String>();
		String content=map.get("content");
		String title=map.get("title");
		String parentSeq=map.get("parentSeq");
		imgList=getImgSrc(content);
		ds.documentWrite(content,imgList,title,parentSeq);
		return dd.latelySeq(parentSeq);
	
	}
	@PostMapping("documentmodify")
	public void documentModify (@RequestBody HashMap<String,String> map) throws IOException {
		List<String> imgList = new ArrayList<String>();
		String content=map.get("content");
		imgList=getImgSrc(content);
		
		ds.documentModify(map,imgList);
	}
	@PostMapping("documentdelete")
	public void documentDelete(@RequestBody HashMap<String,String> map){
		ds.documentDelete(map);
	}
	public List<String> getImgSrc(String str) {

		Pattern nonValidPattern = Pattern.compile("<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>");
		List<String> result = new ArrayList<String>();
		Matcher matcher = nonValidPattern.matcher(str);
		while (matcher.find()) {
			result.add(matcher.group(1));
		}
		return result;
	}
	//전체 최신글 목록
	@GetMapping("latelydocumentlist")
	public List<HashMap<String,Object>> latelyDocumentList() {
		List<HashMap<String, Object>> list= new ArrayList<>();
		list=dd.latelyDocumentList();
		return ds.latelyDocumentList(list);
	}
	
	//주제별 최신글목록
	@PostMapping("samesubjectdocumentlist")
	public List<HashMap<String,Object>> sameSubjectDocumentList(@RequestBody HashMap<String,String> map){
		List<HashMap<String, Object>> list= new ArrayList<>();
		list=dd.sameSubjectDocumentList(map);
		return ds.latelyDocumentList(list);
	}
}
