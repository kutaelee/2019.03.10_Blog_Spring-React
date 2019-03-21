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
	
	public List<HashMap<String,Object>> commentList(String seq){
		return sqlsession.selectList("commentList",seq);
	}

	public String commentCount(String seq) {
		return sqlsession.selectOne("commentCount",seq);
	}

	public void commentWrite(HashMap<String, String> param) {
		 sqlsession.insert("commentWrite",param);
	}
}
