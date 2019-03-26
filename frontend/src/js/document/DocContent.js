import React,{Component} from 'react';
import moment from 'moment';
import Comment from './Comment';
import OtherDocumentList from './OtherDocumentList';
import 'moment/locale/ko';
import '../../css/document/DocContent.css';
import axios from 'axios';


class DocContent extends Component{
	 state = {document:{document_title:"",document_content:"",document_seq:"",document_parent_seq:"",document_regdate:"",document_dir:""},
			  tap:true,
			  comment:[{comment_seq:'',comment_regdate:'',comment_wirter:'',comment_content:''
			}]
		};
	 componentDidMount() {
		this.getDocument();
	 }
	 documentWritePage=()=>{
		let path=window.location.pathname.split('/');
		window.location.href="/document/"+path[2]+"/writepage";
	 }
	 getDocument=()=>{
		 // uri 인덱스 2=주제명 3=문서번호
		let path=window.location.pathname.split('/');
		axios.post("/document",{seq:path[3]}).then(res=>this.setState({document:res.data}));
		axios.post('/commentList',{seq:path[3]}).then(res=>this.setState({comment:res.data}));
	}
	 dateFormat(regdate){
		return new moment(regdate).format('llll');
	}
	tapToggle=(bool)=>{
		this.setState({tap:bool});
	}
	documentModifyPage=()=>{
		let path=window.location.pathname.split('/');
		window.location.href="/document/"+path[2]+"/"+path[3]+"/modifypage";
	}
	documentDelete=(seq,dir)=>{
		if(window.confirm("문서와 이미지가 모두 삭제되며 돌이킬 수 없습니다.\n정말로 문서를 삭제하시겠습니까?")){
			let path=window.location.pathname.split('/');
			axios.post("/documentdelete",{seq:seq,dir:dir})
			.then(()=>axios.post('/latelyseq',{subject_seq:path[2]})
			.then(res =>{alert("삭제가 완료되었습니다!"); window.location = "/document/"+path[2]+"/"+res.data }))
			.catch(e=>alert("글 삭제 중 문제발생!"));
		}
		}
	 render() {
	        return (
				<div>
					
					{this.state.document.document_title ? 
					<div>
					<div className="Doc-button-div"><button onClick={this.documentWritePage}>새글작성</button></div>
	        		<div className="DocContent">
	        		<h1 className="DocContent-title" dangerouslySetInnerHTML={ {__html: this.state.document.document_title} }></h1>	
	        		<hr/>
					<p className="DocContent-regdate">{this.dateFormat(this.state.document.document_regdate)}</p>
					
					<p className="DocContent-content" dangerouslySetInnerHTML={ {__html: this.state.document.document_content} }></p>
					<button className="Doc-modify-btn" onClick={this.documentModifyPage}>수정</button>
					<button className="Doc-delete-btn" onClick={()=>this.documentDelete(this.state.document.document_seq,this.state.document.document_dir)}>삭제</button>
					</div>

					<div className="Tap">
					<span id={"Tap-btn"+(this.state.tap ? '-active' : '')} onClick={()=>this.tapToggle(true)}>댓글</span>
					<span id={"Tap-btn"+(this.state.tap ? '' : '-active')} onClick={()=>this.tapToggle(false)}>다른글</span>
					</div>		
					{this.state.tap ? <Comment CommentFromParentFunction={this.getDocument} CommentFromParent={this.state.comment}></Comment>: <OtherDocumentList></OtherDocumentList> }
					</div>: <div className="Doc-empty">
						<h1>등록된 글이 없습니다!</h1>
						<h1>새로운 글을 등록해주세요!</h1>
						<button onClick={this.documentWritePage}>새글작성</button>
						
						</div>}
					</div>
	        		);
	 };
}

export default DocContent;