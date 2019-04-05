package com.blog.visit;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class VisitDao {

	@Autowired
	private SqlSession sqlsession;
	//유일한 id는 네임스페이스 생략해도 되고 중복되면 에러발생함
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
