package com.blog.link;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class LinkService {
	@Autowired
	LinkDao ld;
	
	public void addLink(HashMap<String, List<String>> map) {
		HashMap<String,String> link=new HashMap<>();
	
		for(int i=0;i<map.get("name").size();i++) {
			link.put("name", map.get("name").get(i));
			link.put("address",map.get("address").get(i));
			link.put("info",map.get("info").get(i));
			ld.addLink(link);
			link.clear();
		}
		
	}

	public void modifyLink(HashMap<String, List<String>> map) {
		HashMap<String,String> link=new HashMap<>();
		
		for(int i=0;i<map.get("seq").size();i++) {
			link.put("seq", map.get("seq").get(i));
			link.put("name", map.get("name").get(i));
			link.put("address",map.get("address").get(i));
			link.put("info",map.get("info").get(i));
			ld.modifyLink(link);
			link.clear();
		}
	}

	public void linkDelete(HashMap<String, List<String>> map) {
		for(int i=0;i<map.get("list").size();i++) {
			ld.linkDelete(map.get("list").get(i));
		}
	}

}
