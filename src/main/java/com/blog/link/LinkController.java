package com.blog.link;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LinkController {
	@Autowired
	LinkDao ld;
	@Autowired
	LinkService ls;

	@PostMapping("taglinklist")
	public List<HashMap<String, Object>> tagLinkList(@RequestBody HashMap<String, String> map) {
		return ld.tagLinkList(map.get("tag"));
	}

	@PostMapping("addLink")
	public boolean addLink(@RequestBody HashMap<String, List<String>> map, HttpSession session) {
		if (session.getAttribute("login") != null) {
			ls.addLink(map);
			return true;
		} else {
			return false;
		}
	}

	@GetMapping("alllinklist")
	public List<HashMap<String, Object>> allLinkList() {
		return ld.allLinkList();
	}

	@PostMapping("modifylink")
	public boolean modifyLink(@RequestBody HashMap<String, List<String>> map, HttpSession session) {
		if (session.getAttribute("login") != null) {
			ls.modifyLink(map);
			return true;
		} else {
			return false;
		}
	}

	@PostMapping("linkdelete")
	public boolean linkDelete(@RequestBody HashMap<String, List<String>> map, HttpSession session) {
		if (session.getAttribute("login") != null) {
			ls.linkDelete(map);
			return true;
		} else {
			return false;
		}
	}

	@PostMapping("listnum")
	public Integer listNum(@RequestBody HashMap<String, Object> map) {
		return ld.listNum(map);
	}
}
