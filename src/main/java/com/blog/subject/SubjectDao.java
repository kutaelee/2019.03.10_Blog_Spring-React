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
	public String getSubjectSeq(String name) {
		return sqlsession.selectOne("subject.getSubjectSeq",name);
	}
	public void insertSubject(HashMap<String, String> map) {
		sqlsession.insert("subject.insertSubject",map);
	}

	public List<HashMap<String,Object>> subjectlist() {
		return sqlsession.selectList("subject.subjectList");
	}
	public HashMap<String,Object> subjectinfo(String seq){
		return sqlsession.selectOne("subject.subjectInfo",seq);
	}

	public void modifySubjectName(HashMap<String,Object> map) {
		sqlsession.update("subject.modifySubjectName",map);
	}

	public void modifySubjectAll(HashMap<String, Object> map) {
		sqlsession.update("subject.modifySubjectAll",map);
	}

	public void subjectDelete(String seq) {
		sqlsession.delete("subjectDelete",seq);
	}
}
