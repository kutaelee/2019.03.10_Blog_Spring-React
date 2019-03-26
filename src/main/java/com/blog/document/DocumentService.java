package com.blog.document;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import com.blog.subject.SubjectService;

@Transactional
@Service
public class DocumentService {
	@Autowired
	private ServletContext servletContext;
	@Autowired
	DocumentDao dd;

	private static final String BASE_64_PREFIX = "data:image/";
	private static final String CONTENT_PATH = "/resources/content/";

	public static byte[] decodeBase64ToBytes(String imageString) {
		if (imageString.startsWith(BASE_64_PREFIX)) {
			String[] str = imageString.split(",");
			return Base64.getDecoder().decode(imageString.substring(str[0].length() + 1));
		} else
			throw new IllegalStateException("it is not base 64 string");
	}

	public boolean isBase64(String imageString) {
		if (imageString.startsWith(BASE_64_PREFIX)) {
			return true;
		} else {
			return false;
		}
	}

	public void documentWrite(String content, List<String> img, String title, String parentSeq) throws IOException {
		Date date = new Date();
		String realPath = servletContext.getRealPath(CONTENT_PATH);
		String folderName = title + date.getTime();
		String backPath = parentSeq + "/" + folderName;

		// 주제명 상위폴더 생성
		File dir = new File(realPath, parentSeq);
		if (!dir.exists()) {
			dir.mkdir();
		}
		// 문서명 하위폴더 생성
		dir = new File(realPath, backPath);
		if (!dir.exists()) {
			dir.mkdir();
		}

		realPath += backPath;
		for (int i = 0; i < img.size(); i++) {
			byte[] data = decodeBase64ToBytes(img.get(i));
			Files.write(new File(realPath + "/" + date.getTime() + i + ".jpg").toPath(), data);
			content = content.replace(img.get(i), CONTENT_PATH + backPath + "/" + date.getTime() + +i + ".jpg");
		}
		HashMap<String, Object> map = new HashMap<>();
		map.put("content", content);
		map.put("title", title);
		map.put("parent_seq", parentSeq);
		map.put("dir", parentSeq + "/" + folderName);
		dd.documentWrite(map);

	}

	public void documentModify(HashMap<String, String> map, List<String> imgList) throws IOException {
		String realPath = servletContext.getRealPath(CONTENT_PATH);
		String backPath = map.get("dir");
		String content = map.get("content");
		Date date = new Date();

		realPath += backPath;
		for (int i = 0; i < imgList.size(); i++) {
			if (isBase64(imgList.get(i))) {
				byte[] data = decodeBase64ToBytes(imgList.get(i));
				Files.write(new File(realPath + "/" + date.getTime() + i + ".jpg").toPath(), data);
				content = content.replace(imgList.get(i), CONTENT_PATH + backPath + "/" + date.getTime() + i + ".jpg");
				imgList.set(i, CONTENT_PATH + backPath + "/" + date.getTime() + i + ".jpg");
			}
		}
		
		notUseFileDelete(imgList, backPath);
		map.put("content", content);
		dd.documentModify(map);
	}

	// 수정된 글의 이미지 중 사용하지 않는 이미지가 있으면 삭제
	public void notUseFileDelete(List<String> imgList, String backPath) {
		String realPath = servletContext.getRealPath(CONTENT_PATH);
		File contentFoloder = new File(realPath + backPath);
		File[] contentFoloderList = contentFoloder.listFiles();
		StringBuffer imgPath = new StringBuffer();

		// 파일이 사용중인지 확인
		if (contentFoloderList.length > 0) {
			for (int i = 0; i < imgList.size(); i++) {
				imgPath.append(servletContext.getRealPath(imgList.get(i)));

				for (int j = 0; j < contentFoloderList.length; j++) {
					if (contentFoloderList[j] != null) {
						if (contentFoloderList[j].toString().equals(imgPath.toString())) {
							contentFoloderList[j] = null;
						}
					}
				}
				imgPath.delete(0, imgPath.length());
			}
			// 사용하지 않는 파일 삭제
			for (int i = 0; i < contentFoloderList.length; i++) {
				if (contentFoloderList[i] != null) {
					contentFoloderList[i].delete();
				}
			}
		}

	}

	public void documentDelete(HashMap<String, String> map) {
		String realDirPath = servletContext.getRealPath(CONTENT_PATH + map.get("dir"));
		File contentFoloder = new File(realDirPath);
		File[] contentFoloderList = contentFoloder.listFiles();
		if (contentFoloderList.length > 0) {
			for (int i = 0; i < contentFoloderList.length; i++) {
				if (i == contentFoloderList.length - 1) {
					SubjectService.fileDelete(contentFoloderList[i].toString(), true, true);
					dd.documentDelete(map.get("seq"));
					break;
				}
				SubjectService.fileDelete(contentFoloderList[i].toString(), false, true);
			}

		} else {
			SubjectService.fileDelete(realDirPath, false, true);
			dd.documentDelete(map.get("seq"));
		}

	}

}
