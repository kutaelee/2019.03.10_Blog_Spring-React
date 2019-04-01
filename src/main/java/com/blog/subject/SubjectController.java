package com.blog.subject;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
		// 추가할 주제의 고유번호
		if (ObjectUtils.isEmpty(sd.lastSubjectSeq())) {
			return 0;
		} else {
			return sd.lastSubjectSeq() + 1;
		}

	}

	@PostMapping("subject/*")
	public void insertSubject(MultipartHttpServletRequest req) throws IllegalStateException, IOException {

		HashMap<String, String> map = new HashMap<>();
		map.put("subjectName", req.getParameter("subjectName"));
		MultipartFile file = req.getFile("img");
		ss.insertSubject(map, file);
	}

	@GetMapping("subjectlist")
	public List<HashMap<String, Object>> subjectlist() {
		return sd.subjectlist();
	}

	@PostMapping("subjectinfo")
	public HashMap<String, Object> subjectinfo(@RequestBody HashMap<String, Object> seq) {
		return sd.subjectinfo(seq.get("seq").toString());
	}

	@PostMapping("subjectmodify")
	public boolean subjectModify(MultipartHttpServletRequest req) throws IllegalStateException, IOException {
		if (ObjectUtils.isEmpty(req.getFile("img"))) {
			HashMap<String, Object> map = new HashMap<>();
			map.put("name", req.getParameter("subjectName"));
			map.put("seq", req.getParameter("seq"));
			return ss.modifySubjectName(map);
		} else {
			HashMap<String, Object> map = new HashMap<>();
			map.put("name", req.getParameter("subjectName"));
			map.put("seq", req.getParameter("seq"));
			map.put("dir", req.getParameter("dir"));
			map.put("img", req.getFile("img"));
			return ss.modifySubjectAll(map);
		}
	}
	
	@PostMapping("subjectdelete")
	public void subjectDelete(@RequestBody HashMap<String, List<String>> map) {
		List<String> list=map.get("list");
		ss.subjectDelete(list);
	}
	@PostMapping("subjectname")
	public List<HashMap<String,Object>> subjectName(@RequestBody List<HashMap<String,Object>> list) {
		for(HashMap<String,Object> map: list) {
			map.put("subject_name",sd.subjectName((Integer)map.get("document_parent_seq")));
		}
		return list;
	}
}
