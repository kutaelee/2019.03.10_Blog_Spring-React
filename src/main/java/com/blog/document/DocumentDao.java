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
	//유일한 id는 네임스페이스 생략해도 되고 중복되면 에러발생함
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

	public HashMap<String,Object> prevDocument(HashMap<String, Object> map) {
		return sqlsession.selectOne("prevDocument",map);
	}
	public HashMap<String,Object> nextDocument(HashMap<String, Object> map) {
		return sqlsession.selectOne("nextDocument",map);
	}
}
