package com.blog.visit;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class VisitDao {

	@Autowired
	private SqlSession sqlsession;

	public HashMap<String, Object> visitCount() {
		return sqlsession.selectOne("visitCount");
	}

	public void visit() {
		sqlsession.update("visit");
	}

	public void todayReset() {
		sqlsession.update("todayReset");
	}
	
}
