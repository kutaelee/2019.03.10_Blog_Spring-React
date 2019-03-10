import React,{Component} from 'react';
import '../css/Content.css';
import axios from 'axios';

class Content extends Component{
	 state = {};
	 
	 render() {
	        return (
	        		<div className="Content">
	        		<h1 className="Content-title">예시 타이틀입니다</h1>
	        		<hr/>
	        		<p>예시내용입니다</p>
	        		<p>예시내용입니다</p>
	        		<p>예시내용입니다</p><p>예시내용입니다</p>
	        		<p>예시내용입니다</p>
	        		<p>예시내용입니다</p>
	        		</div>
	        		);
	 };
}

export default Content;