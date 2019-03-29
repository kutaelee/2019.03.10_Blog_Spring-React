package com.blog.visit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class VisitService {

	@Autowired
	VisitDao vd;

	public void visit() {
		vd.visit();
	}
	
	@Scheduled(cron="0 0 0 * * ?")
	public void todayReset() {
		vd.todayReset();
	}
}
