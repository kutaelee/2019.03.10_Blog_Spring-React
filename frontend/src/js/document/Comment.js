import React,{Component} from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import delIcon from '../../img/icon/delete-16.jpg';
import editIcon from '../../img/icon/edit-16.jpg';
import * as Scroll from 'react-scroll';
import axios from 'axios';


class Comment extends Component{
   state={
        count:'0',
        parent_seq:'',
        modifySw:'',
        deleteSw:'',
        login:false,
        allSw:false,
        loginInfoText:'관리자는 입력할 필요가 없습니다.'
   }
   componentDidMount(){
        this.commentCount();
        this.loginSessionCheck();
        document.querySelector('.CommentWriteForm').addEventListener("keyup",this.handleWriteFormKeyUp);
   }
   componentWillMount(){
        window.removeEventListener("keyup",this.handleWriteFormKeyUp);
   }
   strTrim=(keyword)=>{
        keyword=keyword.replace(/^\s*/,"");
        keyword=keyword.trim();
        return keyword;
   }
   handleWriteFormKeyUp=(e)=>{
       const id=document.getElementById('comment-name');
       const content=document.getElementById('comment-content');
       const pw=document.getElementById('comment-password');
       if(e.keyCode===13){
            if(!this.strTrim(id.value)){
                id.focus();
            }else if(!this.strTrim(pw.value)){
                pw.focus();
            }else if(!this.strTrim(content.value)){
                content.focus();
            }
       }
   }
   loginSessionCheck=()=>{
    axios.get("/loginsessioncheck").then(res=>{
        if(res.data){
            this.setState({login:true});
        }
    }).catch(e=>alert("세션체크 중 문제발생!"));
  }
 
 dateFormat(regdate){
		return new moment(regdate).startOf().fromNow();
    }
    commentCount=()=>{
        let path=window.location.pathname.split('/');
        this.setState({parent_seq:path[3]});
        axios.post('/commentCount',{seq:path[3]}).then(res=>{
            this.setState({count:res.data})
            this.props.pagingCount(res.data);
        });      
    }

    commentTest(name,pw,content){
        if(name.length>0&&pw.length>0&&content.length>0){
            return true;
        }else{
            return false;
        }
    }

    commentWrite=()=>{
        let json={};
        let name='';
        let pw='';
        if(!this.state.login){
            name = document.querySelector('#comment-name').value;
            pw= document.querySelector('#comment-password').value;
        }
        let content=document.querySelector('#comment-content').value;
        let parent_seq=this.state.parent_seq;
       if(this.commentTest(name,pw,content)||this.state.login){
         json.name=name;
         json.pw=pw;
         json.content=content;
         json.parent_seq=parent_seq;
            axios.post('/commentWrite',json).then(res=>
                {
                    if(res.data){
                    alert("댓글 작성이 완료되었습니다!");
                    this.props.CommentFromParentFunction();
                    this.commentCount();
                    document.querySelector('.Reset-btn').click();

                    Scroll.animateScroll.scrollToBottom();  
                   }else{
                    alert("공란을 채워주세요!");
                   }
                }
            );
       }else{
           alert("비어있는 값이 있습니다.");
       }
    }
    modifyCommentForm=(seq)=>{
        this.setState({allSw:true});
        this.setState({modifySw:seq});
    }
    commentModify=(seq)=>{    
        let content;
        let pw;
        if(!this.state.login){
            pw=document.querySelector('#modify-password').value;
        }else{
            pw="";
        }
        content=document.querySelector('.Modify-content').value;
        if(this.commentTest("name",pw,content)||this.state.login){
        axios.post('/commentModify',{seq:seq,content:content,pw:pw}).then(res=>{
            if(res.data){
                 alert("댓글이 성공적으로 수정되었습니다.");          
                this.props.CommentFromParentFunction();
                this.setState({modifySw:'',allSw:false});
              }else{
                alert("비밀번호가 틀립니다.");
              }
         }).catch(e=>"댓글 수정 중 문제발생!");
        }else{
            alert("빈값이 있습니다.");
        }
    }
    modifyCancel=()=>{
        this.setState({allSw:false});
        this.setState({modifySw:''});
    }
    deleteCancel=()=>{
        this.setState({allSw:false});
        this.setState({deleteSw:''});
    }
    commentDelete=(seq)=>{
        let pw;
        if(!this.state.login){
            pw=document.querySelector('#delete-password').value;
        }else{
            pw="";
        }
        if(window.confirm("댓글을 삭제하면 돌이킬 수 없습니다!\n그래도 삭제하시겠어요?")){
            if(this.commentTest("name",pw,"content")||this.state.login){
            axios.post('/commentDelete',{seq:seq,pw:pw}).then(res=>{
                if(res.data){
                    alert("성공적으로 삭제되었습니다!");         
                    this.props.CommentFromParentFunction();
                    this.setState({deleteSw:'',allSw:false,count:this.state.count-1});
                }else{
                    alert("비밀번호가 틀립니다.");
                }
            }).catch(e=>alert("댓글 삭제 중 문제발생!"));
            
        }else{
                alert("비밀번호를 채워주세요!");
            }
        }
    }
    deleteCommentForm=(seq)=>{
        this.setState({allSw:true});
        this.setState({deleteSw:seq});
    }
    escapeComment=(content)=>{
        let expUrl =/(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi;
        content=content.split("<").join("&lt;");
        content=content.split(">;").join("&gt;");
        content=content.replace(expUrl, '<a href="$&" target="_blank">$&</a>');
        return content;
    }
render(){
    
    return(
        <div>
        <form className="CommentWriteForm">	
        <p className="CommentWriteForm-header"><label>★ </label>댓글 작성</p>
        <label htmlFor="name" className="Label-name">닉네임: </label> 
        {this.state.login ? <b className="Admin-info">관리자</b>:<input type="text" id="comment-name" placeholder="홍길동" maxLength='25'></input>}
        <label htmlFor="password" className="Label-password">비밀번호: </label>	
        {this.state.login ? <b className="Admin-info">{this.state.loginInfoText}</b>:<input type="password" id="comment-password" placeholder="●●●●●●" maxLength='20'></input>}
        <textarea className="CommentWriteForm-content" id="comment-content" maxLength='250'></textarea>
        <input type="reset" className="Reset-btn"></input>
        <button type="button" className="Comment-write-btn" onClick={this.commentWrite}>등록</button>
        
        </form>
        
        <div className="Comment-body">
          
            <p className="Comment-header">Comment '<b className="Comment-count">{this.state.count}</b>' </p>
            
           {
					this.props.CommentFromParent.map(
						(item)=><div className="Comment-list" key={item.comment_seq} id={"cl-"+item.comment_seq}>
						<p className="Comment-writer">{item.comment_writer}</p>
                        <p className="Comment-regdate">{this.dateFormat(item.comment_regdate)}</p>
                        {!this.state.allSw ?<img className="Comment-edit" onClick={()=>this.modifyCommentForm(item.comment_seq)} src={editIcon} alt="Edit icon"/> :""}
                        {!this.state.allSw ? <img className="Comment-del" onClick={()=>this.deleteCommentForm(item.comment_seq)} src={delIcon} alt="Delete icon"/> : ""}
                      
                        {this.state.deleteSw===item.comment_seq ?   <div> {this.state.login ? <b className="Admin-info" id="admin-info">{this.state.loginInfoText}</b> : <span><label htmlFor="password" className="Label-delete-password">비밀번호: </label>	
                        <input type="password" id="delete-password" placeholder="●●●●●●" maxLength='20'></input></span> }
                        <button className="Modify-cancel-btn" onClick={this.deleteCancel}>취소</button> 
                        <button className="Comment-delete-btn" onClick={()=>this.commentDelete(item.comment_seq)}>삭제</button>                
                        </div>: "" }

                        {this.state.modifySw===item.comment_seq ? 
                        <div> {this.state.login ? <b className="Admin-info" id="admin-info">{this.state.loginInfoText}</b> : <span><label htmlFor="password" className="Label-modify-password">비밀번호: </label>	
                        <input type="password" id="modify-password" placeholder="●●●●●●" maxLength='20'></input> </span>}
                        <button className="Modify-cancel-btn" onClick={this.modifyCancel}>취소</button><br/>
                        <textarea className='Modify-content' defaultValue={item.comment_content} maxLength='250'></textarea>
                        <button className="Comment-Modify-btn" onClick={()=>this.commentModify(item.comment_seq)}>수정</button>
           
                        </div> :  <p className="Comment-content" dangerouslySetInnerHTML={ {__html: this.escapeComment(item.comment_content) } }/>  }          
                        </div>
					) 
			}

           
        </div>
        </div>
         );
    };
}
export default Comment;