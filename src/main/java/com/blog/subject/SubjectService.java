package com.blog.subject;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.blog.document.DocumentDao;

@Transactional
@Service
public class SubjectService {
	@Autowired
	private ServletContext servletContext;
	@Autowired
	SubjectDao sd;
	@Autowired
	DocumentDao dd;
	private static final String CONTENT_PATH = "/resources/content/";

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

		if (fileDelete(map.get("dir").toString(), false, false)) {
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
		} else {
			// 파일 삭제 실패
			return false;
		}

	}

	// 파일 삭제
	public boolean fileDelete(String filePath, boolean deleteparent, boolean realPath) {

		File oldfile = new File(filePath);
		if (!realPath) {
			String originalpath = servletContext.getRealPath(filePath);
			oldfile = new File(originalpath);
		}

		if (oldfile.exists()) {

			if (oldfile.delete()) {
				// 주제 삭제시 폴더도 같이삭제 재귀함수이용
				if (deleteparent) {
					String parentpath = new File(filePath).getParent();
					if (realPath) {
						fileDelete(parentpath, false, true);
					} else {
						fileDelete(parentpath, false, false);
					}
					return true;
				} else
					return true;

			} else
				return false;

		} else
			return false;
	}

	public void subjectDelete(List<String> list) {
		HashMap<String, Object> map = new HashMap<>();
		StringBuffer contentPath = new StringBuffer();

		// 선택된 주제 삭제
		for (int i = 0; i < list.size(); i++) {
			map = sd.subjectinfo(list.get(i));
			if (fileDelete(map.get("subject_dir").toString(), true, false)) {
				List<String> documentDirList = dd.documentDirList(map.get("subject_seq").toString());

				// 주제에 연결된 문서 파일들 모두 삭제
				for (int j = 0; j < documentDirList.size(); j++) {
					contentPath.append(CONTENT_PATH + documentDirList.get(j));

					File deleteFolder = new File(servletContext.getRealPath(contentPath.toString()));
					File[] deleteFolderList = deleteFolder.listFiles();

					if (deleteFolderList.length>0) {
						for (int x = 0; x < deleteFolderList.length; x++) {
							if (x == deleteFolderList.length - 1) {
								fileDelete(deleteFolderList[x].toString(), true, true);
								break;
							}
							fileDelete(deleteFolderList[x].toString(), false, true);

						}
					} else {
						deleteFolder.delete();
					}

					if (j == documentDirList.size() - 1) {
						fileDelete(deleteFolder.getParent(), false, true);
					}
					contentPath.delete(0, contentPath.length());
				}
				sd.subjectDelete(list.get(i));
				
			} else {
				System.out.println("삭제실패");
			}

		}

	}

}
