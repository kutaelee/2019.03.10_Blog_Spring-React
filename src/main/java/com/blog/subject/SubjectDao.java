package com.blog.subject;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SubjectDao {
	@Autowired
	private SqlSession sqlsession;
	
	public Integer lastSubjectSeq() {
		return sqlsession.selectOne("subject.lastSubjectSeq");
	}

	public void insertSubject(HashMap<String, String> map) {
		sqlsession.insert("subject.insertSubject",map);
	}

	public List<HashMap<String,Object>> getSubject() {
		return sqlsession.selectList("subject.getSubject");
	}
}
