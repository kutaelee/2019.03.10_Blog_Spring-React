package com.blog.document;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.apache.commons.text.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.subject.SubjectController;
import com.blog.subject.SubjectDao;

@RestController
public class DocumentController {
	@Autowired
	DocumentDao dd;
	@Autowired
	DocumentService ds;
	@Autowired
	SubjectController sc;

	@PostMapping("document")
	public HashMap<String, Object> document(@RequestBody HashMap<String, Object> document_seq) {
		return dd.document((String) document_seq.get("seq"));
	}

	@PostMapping("latelyseq")
	public String latelySeq(@RequestBody HashMap<String, String> map) {
		return dd.latelySeq(map.get("subject_seq").toString());
	}

	@PostMapping("documentwrite")
	public String documentWrite(@RequestBody HashMap<String, String> map, HttpSession session) throws IOException {
		if (session.getAttribute("login") != null) {
			List<String> imgList = new ArrayList<String>();
			String content = map.get("content");
			String title = map.get("title");
			String parentSeq = map.get("parentSeq");
			imgList = getImgSrc(content);
			ds.documentWrite(content, imgList, title, parentSeq);
			return dd.latelySeq(parentSeq);
		} else {
			return null;
		}

	}

	@PostMapping("documentmodify")
	public boolean documentModify(@RequestBody HashMap<String, String> map, HttpSession session) throws IOException {
		if (session.getAttribute("login") != null) {
			List<String> imgList = new ArrayList<String>();
			String content = map.get("content");
			imgList = getImgSrc(content);
			ds.documentModify(map, imgList);
			return true;
		} else {
			return false;
		}
	}

	@PostMapping("documentdelete")
	public boolean documentDelete(@RequestBody HashMap<String, String> map, HttpSession session) {
		if (session.getAttribute("login") != null) {
			ds.documentDelete(map);
			return true;
		} else {
			return false;
		}
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

	// 전체 최신글 목록
	@GetMapping("latelydocumentlist")
	public List<HashMap<String, Object>> latelyDocumentList() {
		List<HashMap<String, Object>> list = new ArrayList<>();
		list = dd.latelyDocumentList();
		return ds.latelyDocumentList(list);
	}

	// 주제별 최신글목록
	@PostMapping("samesubjectdocumentlist")
	public List<HashMap<String, Object>> sameSubjectDocumentList(@RequestBody HashMap<String, String> map) {
		List<HashMap<String, Object>> list = new ArrayList<>();
		list = dd.sameSubjectDocumentList(map);
		return ds.latelyDocumentList(list);
	}

	// 검색에서 중복코드를 줄이기 위해 사용
	public List<HashMap<String, Object>> search(HashMap<String, Object> map) {
		map.put("keyword", StringEscapeUtils.unescapeHtml4((String) map.get("keyword")));
		List<HashMap<String, Object>> list = dd.searchDocument(map);
		list = sc.subjectName(list);
		return list;
	}

	@PostMapping("searchdocument")
	public List<HashMap<String, Object>> searchDocument(@RequestBody HashMap<String, Object> map) {
		if (!ObjectUtils.isEmpty(map)) {
			if (ObjectUtils.isEmpty(map.get("page"))) {
				map.put("index", 0);
				return search(map);
			} else {
				int index = Integer.parseInt((String) map.get("page")) - 1;
				map.put("index", index * 10);
				return search(map);
			}
		} else {
			return null;
		}
	}

	@PostMapping("searchcount")
	public String searchCount(@RequestBody HashMap<String, Object> map) {
		return dd.searchCount((String) map.get("keyword"));
	}
	
	@PostMapping("prevDocument")
	public HashMap<String,Object> prevDocument(@RequestBody HashMap<String, Object> map ) {
		return dd.prevDocument(map);
	}
	@PostMapping("nextDocument")
	public HashMap<String,Object> nextDocument(@RequestBody HashMap<String, Object> map ) {
		return dd.nextDocument(map);
	}
}
