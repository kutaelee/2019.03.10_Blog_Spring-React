package com.blog.link;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class LinkService {
	@Autowired
	LinkDao ld;
	
	public void addLink(HashMap<String, String> map) {
		ld.addLink(map);
	}

}
