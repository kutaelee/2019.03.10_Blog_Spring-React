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

	public void insertSubject(HashMap<String, String> map, MultipartFile mf) throws IllegalStateException, IOException {
		String path = servletContext.getRealPath("/resources/subjectfile/");
		Date date = new Date();

		String filename;
		String path2 = map.get("subjectName") + date.getTime();
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

		map.put("subjectDir", "/resources/subjectfile/" + path2 + "/" + filename);

		sd.insertSubject(map);

	}

	public boolean modifySubjectName(HashMap<String, Object> map) {
		sd.modifySubjectName(map);
		return true;
	}

	public boolean modifySubjectAll(HashMap<String, Object> map) throws IllegalStateException, IOException {	
		String originalpath = servletContext.getRealPath((String) map.get("dir"));
		File oldfile = new File(originalpath);
		String parentpath=new File((String) map.get("dir")).getParent();
		String newfilepath = servletContext.getRealPath(parentpath);

		if (oldfile.exists()) {
			if (oldfile.delete()) {
				MultipartFile mf=(MultipartFile) map.get("img");
				String filename =mf.getOriginalFilename();
				filename = filename.replaceAll("#", "");
				if (filename.length() == 0) {
					filename = "1";
				}
				mf.transferTo(new File(newfilepath + "/" + filename));		
				map.put("dir",parentpath + "/" + filename);
				
				sd.modifySubjectAll(map);
				return true;
			} else {
				System.out.println("파일삭제 실패");
				return false;
			}
		} else {
			System.out.println("파일이 존재하지 않습니다.");
			return false;
		}

	}

}
