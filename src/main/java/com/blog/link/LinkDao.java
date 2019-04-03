package com.blog.link;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LinkDao {
	@Autowired
	SqlSession sqlsession;
	
	public List<HashMap<String, Object>> tagLinkList(String tag) {	
		return sqlsession.selectList("tagLinkList",tag);
	}

	public void addLink(HashMap<String, String> map) {
		 sqlsession.insert("addLink",map);
	}

	public List<HashMap<String, Object>> allLinkList() {
		return sqlsession.selectList("allLinkList");
	}

	public void modifyLink(HashMap<String, String> link) {
		sqlsession.update("modifyLink",link);
	}

	public void linkDelete(String seq) {
		sqlsession.delete("linkDelete",seq);
	}
	public Integer listNum(HashMap<String,Object> map) {
		return sqlsession.selectOne("listNum",map);
	}
}
