import React,{Component} from 'react';
import moment from 'moment';
import Comment from './Comment';
import OtherDocumentList from './OtherDocumentList';
import 'moment/locale/ko';
import '../../css/document/DocContent.css';
import axios from 'axios';

const path=window.location.pathname.split('/');
class DocContent extends Component{
	 state = {document:{document_title:"",document_content:"",document_seq:"",document_parent_seq:"",document_regdate:"",document_dir:""},
			  tap:true,
			  comment:[{comment_seq:'',comment_regdate:'',comment_wirter:'',comment_content:''}],
			  docSw:false,
			  commentPageNumber:[1],
				curPageNum:1,
				commentCount:0,
				login:false,
				margin:0
			
		};
	 componentDidMount() {
		this.getDocument();
		this.loginSessionCheck();
	 }

	 documentWritePage=()=>{
		
		window.location.href="/document/"+path[2]+"/writepage";
	 }
	 loginSessionCheck=()=>{
		axios.get("/loginsessioncheck").then(res=>{
				if(res.data)
						this.setState({login:true});
		}).catch(e=>alert("세션체크 중 문제발생!"));
}
	 getDocument=()=>{
		 // uri 인덱스 2=주제명 3=문서번호
	
		axios.post("/document",{seq:path[3]}).then(res=> {
			if(res.data.document_title){
				this.setState({document:res.data});
				axios.post("/listnum",{parent:res.data.document_parent_seq,seq:res.data.document_seq})
				.then(res=>
					{		
						if(res.data>1){
							this.setState({margin:200+(res.data-1)*190*-1 })
					}		
					}).catch(e=>alert("리스트번호 가져오던 중 문제발생!"));
			}else{
				this.setState({docSw:true});
			}
				
			}).catch(e=>alert("문서 가져오던 중 문제발생!"));
		this.contentListPage();
	}

	//주제에서 몇번째인지 확인 후 마진 줄때 사용

	contentListPage(page)
    {
		axios.post('/commentList',{seq:path[3],page:page}).then(res=>this.setState({comment:res.data}));
		page*=1;
		let oldEl=document.getElementById('pageNum'+this.state.curPageNum);
		let curEl=document.getElementById('pageNum'+(page));
		if(oldEl){
			oldEl.style.color='black';
		}
		this.setState({curPageNum:page});
		if(curEl){
			curEl.style.color='red';
		}
	}

	pagingCount=(count)=>{
		this.setState({commentCount:count});
		let arr=[];
		let pageCount=0;
		if(count%10===0){
			pageCount=Math.floor(count/10);
		}else{
			pageCount=Math.floor(count/10)+1;
		}
		let i=1;
		if(pageCount>10&&pageCount%10!==0){
			 i=Math.floor(pageCount/10)*10+1;
		}else if(pageCount>10&&pageCount%10===0){
			i=Math.floor(pageCount/10)*10-9;
		}
		if(pageCount===0){
			pageCount=1;
		}
        for(i; i < pageCount+1; i++) {
             arr.push(i);
				 }
		 this.setState({curPageNum:pageCount});
		 this.setState({commentPageNumber:arr});
	}
	leftPaging=(count)=>{

		if(count>10){
			if(count%10===0){
				count=(count-count%10)-11;
			}else{
				count=(count-count%10)-10;
			}
				let arr=[];
				let mul=Math.floor(count/10);
				let j=10;
				if(mul===0){
					mul=1;
					j=0;
				}
				let i=j*mul+1;
				let pageCount=i+9;
				for(i;i<=pageCount;i++){
					arr.push(i);
				}
				this.setState({curPageNum:pageCount});
				this.setState({commentPageNumber:arr});
				this.contentListPage(pageCount+"");
			}else{
				this.setState({curPageNum:1});
				this.contentListPage(1+"");
		}
	}
	rightPaging=(count)=>{
		let	maxCount=0;
			if(Math.floor(this.state.commentCount%10===0)){
					maxCount=Math.floor(this.state.commentCount/10);
			}else{
					maxCount=Math.floor(this.state.commentCount/10)+1;
			}
	
	if(count%10!==0){
		count=(count-count%10)+10;
	}else{
		count=(count-count%10);
	}
	if(count<maxCount){
			let arr=[];
							let mul=Math.floor(count/10);
			let j=10;
							let i=j*mul+1;
							this.setState({curPageNum:i});
							this.contentListPage(i+"");
			let pageCount=i+9;
			if(i+9>maxCount){
				pageCount=maxCount;
			}		
			for(i;i<=pageCount;i++){
				arr.push(i);
							}
			this.setState({commentPageNumber:arr});

		}else{
			this.setState({curPageNum:maxCount});
			this.contentListPage(maxCount+"");
	}
	}
	 dateFormat(regdate){
		return new moment(regdate).format('llll');
	}
	tapToggle=(bool)=>{
		this.setState({tap:bool});
	}
	documentModifyPage=()=>{
	
		window.location.href="/document/"+path[2]+"/"+path[3]+"/modifypage";
	}
	documentDelete=(seq,dir)=>{
		if(window.confirm("문서와 이미지가 모두 삭제되며 돌이킬 수 없습니다.\n정말로 문서를 삭제하시겠습니까?")){
		
			axios.post("/documentdelete",{seq:seq,dir:dir})
			.then(()=>axios.post('/latelyseq',{subject_seq:path[2]}))
			.then(res =>{
				if(res.data){
					alert("삭제가 완료되었습니다!");
					window.location = "/document/"+path[2]+"/"+res.data;	
				}else{
					alert("권한이 없습니다");
				}
				}).catch(e=>alert("글 삭제 중 문제발생!"));
			}
		}
	 render() {
	        return (
				<div>
					
					{this.state.document.document_title ? 
					<div>
					<div className="Doc-button-div">
					{this.state.login ? <button onClick={this.documentWritePage}>새글작성</button> : "" }</div>
	        		<div className="DocContent">
	        		<h1 className="DocContent-title" dangerouslySetInnerHTML={ {__html: this.state.document.document_title} }></h1>	
	        		<hr/>
					<p className="DocContent-regdate">{this.dateFormat(this.state.document.document_regdate)}</p>
					
					<p className="DocContent-content" dangerouslySetInnerHTML={ {__html: this.state.document.document_content} }></p>
					{this.state.login ? 
					<div>
					<button className="Doc-modify-btn" onClick={this.documentModifyPage}>수정</button>
					<button className="Doc-delete-btn" onClick={()=>this.documentDelete(this.state.document.document_seq,this.state.document.document_dir)}>삭제</button>
						</div>
					: ""}
					</div>

					<div className="Tap">
					<span id={"Tap-btn"+(this.state.tap ? '-active' : '')} onClick={()=>this.tapToggle(true)}>댓글</span>
					<span id={"Tap-btn"+(this.state.tap ? '' : '-active')} onClick={()=>this.tapToggle(false)}>다른글</span>
					</div>		
					{this.state.tap ? <div><Comment pagingCount={this.pagingCount} CommentFromParentFunction={this.getDocument} CommentFromParent={this.state.comment}></Comment>
					         <div className="Paging">
							 <button className="Paging-left-btn" onClick={()=>this.leftPaging(this.state.curPageNum)}>◀</button>
							 {this.state.commentPageNumber.map((item)=><b className="Comment-pageNumber" id={"pageNum"+item} onClick={()=>this.contentListPage(item+"")} style={{color: item===this.state.curPageNum ? "red" : "black" }} key={item}>{item}</b>)}
							 <button className="Paging-right-btn" onClick={()=>this.rightPaging(this.state.curPageNum)}>▶</button>
							 </div> </div>: <OtherDocumentList margin={this.state.margin}></OtherDocumentList> }
					</div>:this.state.docSw ? <div className="Doc-empty">
						<h1>해당하는 글이 없습니다.</h1>
						{this.state.login ?	<button onClick={this.documentWritePage}>새글작성</button>	:""}		
						</div> : <div className="Doc-empty">	<h1 className="Document_loading">글 불러오는중...</h1> </div>}
					
					</div>
					
					);
	 };
}

export default DocContent;