package com.blog.subject;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

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
	
		String parentpath = new File((String) map.get("dir")).getParent();
		String newfilepath = servletContext.getRealPath(parentpath);

		if(subjectFileDelete(map.get("dir").toString(),false)) {
			MultipartFile mf = (MultipartFile) map.get("img");
			String filename = mf.getOriginalFilename();
			filename = filename.replaceAll("#", "");
			if (filename.length() == 0) {
				filename = "1";
			}
			mf.transferTo(new File(newfilepath + "/" + filename));
			map.put("dir", parentpath + "/" + filename);

			sd.modifySubjectAll(map);
			return true;
		}else {
			//파일 삭제 실패
			return false;
		}


	}
	//파일 삭제
	public boolean subjectFileDelete(String dir,boolean deleteparent) {
		String originalpath = servletContext.getRealPath(dir);
		File oldfile = new File(originalpath);
		if (oldfile.exists()) {

			if (oldfile.delete()) {
				//주제 삭제시 폴더도 같이삭제 재귀함수이용
				if(deleteparent) {
					String parentpath = new File(dir).getParent();
					subjectFileDelete(parentpath,false);
					return true;
				}else 
					return true;
				
			} else
				return false;

		} else
			return false;

	}

	public void subjectDelete(List<String> list) {
		HashMap<String, Object> map = new HashMap<>();
		for (int i = 0; i < list.size(); i++) {
			map = sd.subjectinfo(list.get(i));
			if (subjectFileDelete(map.get("subject_dir").toString(),true)) {
				sd.subjectDelete(list.get(i));
			} else {
				System.out.println("삭제실패");
			}

		}

	}

}
