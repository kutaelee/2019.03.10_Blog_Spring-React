package com.blog.member;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDao {
	@Autowired
	private SqlSession sqlsession;
	//유일한 id는 네임스페이스 생략해도 되고 중복되면 에러발생함
	public void memberInsert(HashMap<String, String> info) {
		sqlsession.insert("memberInsert",info);
	}

	public String userInfo(String id) {
		return sqlsession.selectOne("userInfo",id);
		
	}

}
