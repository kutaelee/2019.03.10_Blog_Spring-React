package com.blog.comment;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CommentDao {
	@Autowired
	private SqlSession sqlsession;
	//유일한 id는 네임스페이스 생략해도 되고 중복되면 에러발생함
	public List<HashMap<String,Object>> commentList(HashMap<String, Object> map){
		return sqlsession.selectList("commentList",map);
	}

	public String commentCount(Object object) {
		return sqlsession.selectOne("commentCount",object);
	}

	public void commentWrite(HashMap<String, String> param) {
		 sqlsession.insert("commentWrite",param);
	}

	public String getPassword(String seq) {
		return sqlsession.selectOne("comment.getPassword",seq);
	}

	public void commentModify(HashMap<String, String> map) {
		sqlsession.update("commentModify",map);
	}

	public void commentDelete(String seq) {
		sqlsession.delete("commentDelete",seq);
	}


}
