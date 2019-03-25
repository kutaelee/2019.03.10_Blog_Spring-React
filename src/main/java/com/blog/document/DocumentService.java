package com.blog.document;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	public void documentWrite(String content, List<String> img, String title, String parentSeq) throws IOException {
		Date date=new Date();
		String realPath = servletContext.getRealPath(CONTENT_PATH);
		String folderName=title+date.getTime();
		String backPath = parentSeq + "/" + folderName;
	
		//주제명 상위폴더 생성
		File dir = new File(realPath, parentSeq);
		if (!dir.exists()) {
			dir.mkdir();
		}
		//문서명 하위폴더 생성
		dir = new File(realPath, backPath);
		if (!dir.exists()) {
			dir.mkdir();
		}
		
		realPath += backPath;
		for (int i = 0; i < img.size(); i++) {
			byte[] data = decodeBase64ToBytes(img.get(i));
			Files.write(new File(realPath + "/" + i + ".jpg").toPath(), data);
			content = content.replace(img.get(i), CONTENT_PATH + backPath + "/" + i + ".jpg");
		}
		HashMap<String, Object> map = new HashMap<>();
		map.put("content", content);
		map.put("title", title);
		map.put("parent_seq", parentSeq);
		map.put("dir",parentSeq+"/"+folderName);
		dd.documentWrite(map);

	}

}
