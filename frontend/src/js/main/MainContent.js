import React,{Component} from 'react';
import '../../css/main/MainContent.css';
import imsi from '../../img/top-bg.jpg';
import { Link } from 'react-router-dom';


class Content extends Component{
	 state = {};

	 render() {
	        return (
	        		<div className="Content">
	        			<h1 className="Content-title">최근 등록한 글</h1>
	        			<hr/>
						<div className="Content-list">
					<Link to="/document/a" style={{color:'black'}}>
						<div className="Content-list-item">						
							<img src={imsi} alt="a"></img>
							<h4>최신글 제목최신글 제목최신글 제목최신글 제목</h4>
						</div>
						</Link>
						</div>
	        		</div>
	        		);
	 };
}

export default Content;