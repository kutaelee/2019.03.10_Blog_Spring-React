package com.blog.document;

import java.util.HashMap;
import java.util.List;

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

	public String latelySeq(String subject_seq) {
		return sqlsession.selectOne("latelySeq",subject_seq);
	}

	public void documentWrite(HashMap<String, Object> map) {
		sqlsession.insert("documentWrite",map);
	}
	public List<String> documentDirList(String parentSeq){
		return sqlsession.selectList("documentDirList",parentSeq);
	}

	public void documentModify(HashMap<String, String> map) {
		sqlsession.update("documentModify",map);
	}

	public void documentDelete(String seq) {
		sqlsession.delete("documentDelete",seq);
	}

	public List<HashMap<String, Object>> latelyDocumentList() {
		return sqlsession.selectList("latelyDocumentList");
	}
	public List<HashMap<String, Object>> sameSubjectDocumentList(HashMap<String,String> map){
		return sqlsession.selectList("sameSubjectDocumentList",map);
	}

	public List<HashMap<String, Object>> searchDocument(HashMap<String, Object> map) {

		return sqlsession.selectList("searchDocument",map);
	}

	public String searchCount(String keyword) {
		return sqlsession.selectOne("searchCount",keyword);
	}
}
