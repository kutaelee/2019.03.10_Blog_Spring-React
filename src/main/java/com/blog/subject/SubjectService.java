package com.blog.subject;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Service
public class SubjectService {
	@Autowired
	private ServletContext servletContext;
	@Autowired
	SubjectDao sd;
	
	public void insertSubject(HashMap<String,String> map, MultipartFile mf) throws IllegalStateException, IOException {
		String path = servletContext.getRealPath("/resources/subjectfile/");
		Date date = new Date();

		String filename;
		String path2 = map.get("subjectName")+ date.getTime();
		// 폴더생성
		File parent = new File(path);
		File desti = new File(parent, path2);
		if (!desti.exists()) {
			desti.mkdir();
		}
		path = path + path2;
		
		// 파일업로드
		filename = mf.getOriginalFilename();
		filename = filename.replaceAll("#", "");
		if (filename.length() == 0) {
			filename = "1";
		}
		mf.transferTo(new File(path + "/" + filename));
		
		map.put("subjectDir","/resources/subjectfile/"+filename);
		
		sd.insertSubject(map);
		
	}

}
