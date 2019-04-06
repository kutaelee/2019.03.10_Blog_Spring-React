import React,{Component} from 'react';
import '../../css/main/MainContent.css';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';

class Content extends Component{
	 state = {latelyDocumentList:[{document_seq:'',document_title:'',document_parent_seq:'',img:'',document_regdate:''}]};

	 componentDidMount(){
		axios.get('/latelydocumentlist').then(res=>this.setState({latelyDocumentList:res.data}));
	 }
	 dateFormat(regdate){
		return new moment(regdate).format('llll');
	}
	titleFormat(title){
		if(title.length>55){
			let str=title.substring(0,55);
			return str+" ...";
		}else{
			return title;
		}
	}
	selectDoc=(parentSeq,seq)=>{
		window.location.href="/document/"+parentSeq+"/"+seq;
	}
	 render() {
	        return (
	        		<div className="Content">
	        			<h1 className="Content-title">최근 등록한 글</h1>
	        			<hr/>
						
						{this.state.latelyDocumentList ? <div className="Content-list" >
						{
						this.state.latelyDocumentList.map(	
						(item)=>
						<div className="Content-list-item" onClick={()=>this.selectDoc(item.document_parent_seq,item.document_seq)} key={item.document_seq}>						
							<img src={item.img} alt={item.document_title}></img>
							<p>{this.dateFormat(item.document_regdate)}</p>		
							<div className="Content-title">
							<h4>{this.titleFormat(item.document_title)}</h4>
							</div>		
						</div>
						)} </div> : "최신글 불러오는중.."}
	        		</div>
	        		);
	 };
}

export default Content;