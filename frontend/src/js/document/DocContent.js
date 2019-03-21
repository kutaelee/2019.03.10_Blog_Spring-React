import React,{Component} from 'react';
import moment from 'moment';
import Comment from './Comment';
import OtherDocumentList from './OtherDocumentList';
import 'moment/locale/ko';
import '../../css/document/DocContent.css';
import axios from 'axios';


class DocContent extends Component{
	 state = {document:{document_title:"",document_content:"",document_seq:"",document_parent_seq:"",document_regdate:""},
			  tap:true,
			  comment:[{comment_seq:'',comment_regdate:'',comment_wirter:'',comment_content:''
			}]
		};
	 componentDidMount() {
		this.getDocument();
	
	 }

	 getDocument=()=>{
		 // uri 인덱스 2=주제의 고유번호 3=문서번호
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
	 render() {
	        return (
				<div>
					<div className="Doc-button-div"><button>새글작성</button></div>
	        		<div className="DocContent">
	        		<h1 className="DocContent-title">{this.state.document.document_title}</h1>	
	        		<hr/>
					<p className="DocContent-regdate">{this.dateFormat(this.state.document.document_regdate)}</p>
					
					<p className="DocContent-content" dangerouslySetInnerHTML={ {__html: this.state.document.document_content} }></p>
					<button className="Doc-modify-btn">수정</button>
					<button className="Doc-delete-btn">삭제</button>
	        		</div>
					<div className="Tap">
					<span id={"Tap-btn"+(this.state.tap ? '-active' : '')} onClick={()=>this.tapToggle(true)}>댓글</span>
					<span id={"Tap-btn"+(this.state.tap ? '' : '-active')} onClick={()=>this.tapToggle(false)}>다른글</span>
					</div>		
					{this.state.tap ? <Comment CommentFromParentFunction={this.getDocument} CommentFromParent={this.state.comment}></Comment>: <OtherDocumentList></OtherDocumentList> }
					</div>
	        		);
	 };
}

export default DocContent;