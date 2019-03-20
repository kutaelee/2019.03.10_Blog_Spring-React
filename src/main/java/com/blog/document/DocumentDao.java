package com.blog.document;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DocumentDao {
	@Autowired
	private SqlSession sqlsession;
	//네임스페이스 생략했는데 그냥 됨 알아볼 필요있음
	public HashMap<String, Object> document(String seq) {
		return sqlsession.selectOne("document",seq);
	}

	public String latelySeq(HashMap<String, String> subject_seq) {
		return sqlsession.selectOne("latelySeq",subject_seq);
	}

	
}
