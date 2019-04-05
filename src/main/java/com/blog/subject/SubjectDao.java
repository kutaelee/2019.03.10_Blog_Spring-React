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
	//유일한 id는 네임스페이스 생략해도 되고 중복되면 에러발생함
	public Integer lastSubjectSeq() {
		return sqlsession.selectOne("lastSubjectSeq");
	}
	public String getSubjectSeq(String name) {
		return sqlsession.selectOne("getSubjectSeq",name);
	}
	public void insertSubject(HashMap<String, String> map) {
		sqlsession.insert("insertSubject",map);
	}

	public List<HashMap<String,Object>> subjectlist() {
		return sqlsession.selectList("subjectList");
	}
	public HashMap<String,Object> subjectinfo(String seq){
		return sqlsession.selectOne("subjectInfo",seq);
	}

	public void modifySubjectName(HashMap<String,Object> map) {
		sqlsession.update("modifySubjectName",map);
	}

	public void modifySubjectAll(HashMap<String, Object> map) {
		sqlsession.update("modifySubjectAll",map);
	}

	public void subjectDelete(String seq) {
		sqlsession.delete("subjectDelete",seq);
	}
	public String subjectName(Integer seq) {
		return sqlsession.selectOne("subjectName",seq);
	}
}
