package com.blog.comment;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

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
	public List<HashMap<String, Object>> commentList(@RequestBody HashMap<String, Object> map) {
		if (!ObjectUtils.isEmpty(map)) {
			if (ObjectUtils.isEmpty(map.get("page"))) {
				Integer count = Integer.parseInt(commentCount(map));
				if (count / 10 == 0 || count <= 10) {
					map.put("index", 0);
				} else {
					map.put("index", count / 10 * 10);
				}
				return cd.commentList(map);
			} else {
				int index = Integer.parseInt((String) map.get("page")) - 1;
				map.put("index", index * 10);
				return cd.commentList(map);
			}
		} else {
			return null;
		}
	}

	@PostMapping("commentCount")
	public String commentCount(@RequestBody HashMap<String, Object> map) {
		if (!ObjectUtils.isEmpty(map)) {
			return cd.commentCount(map.get("seq"));
		} else {
			return null;
		}
	}

	@PostMapping("commentWrite")
	public boolean commentWrite(@RequestBody HashMap<String, String> map, HttpSession session) {
		if (session.getAttribute("login") != null) {
			map.put("name", "관리자");
			map.put("pw", "1234");
		}
		for (String key : map.keySet()) {
			if (!StringUtils.isEmpty(map.get(key)) && !StringUtils.isBlank(map.get(key))) {
				map.put(key, StringEscapeUtils.unescapeHtml4(map.get(key)));
			} else {
				return false;
			}
		}

		cs.commentWrite(map);
		return true;
	}

	@PostMapping("commentModify")
	public boolean commentModify(@RequestBody HashMap<String, String> map, HttpSession session) {
		if (session.getAttribute("login") != null) {
			map.put("name", "관리자");
			map.put("pw", "1234");
		}
		for (String key : map.keySet()) {
			if (!StringUtils.isEmpty(map.get(key)) && !StringUtils.isBlank(map.get(key))) {
				map.put(key, StringEscapeUtils.unescapeHtml4(map.get(key)));
			} else {
				return false;
			}
		}

		if (cs.passwordCheck(map) || session.getAttribute("login") != null) {
			cs.commentModify(map);
			return true;
		} else {
			return false;
		}

	}

	@PostMapping("commentDelete")
	public boolean commentDelete(@RequestBody HashMap<String, String> map, HttpSession session) {
		if (cs.passwordCheck(map) || session.getAttribute("login") != null) {
			cs.commentDelete(map.get("seq"));
			return true;
		} else {
			return false;
		}
	}
}
