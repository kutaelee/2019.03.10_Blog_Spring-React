import React,{Component} from 'react';
import moment from 'moment';
import delIcon from '../../img/icon/delete-16.jpg';
import editIcon from '../../img/icon/edit-16.jpg';
import * as Scroll from 'react-scroll';
import axios from 'axios';
import 'moment/locale/ko';

class Comment extends Component{
   state={
        count:'0',
        parent_seq:''
   }
   componentDidMount(){
        this.commentCount();
       
   }
 dateFormat(regdate){
		return new moment(regdate).startOf().fromNow();
    }
    commentCount=()=>{
        let path=window.location.pathname.split('/');
        this.setState({parent_seq:path[3]});
        axios.post('/commentCount',{seq:path[3]}).then(res=>this.setState({count:res.data}));      
    }

    
    ConvertSystemSourcetoHtml(str){
    str = str.replace(/</g,"&lt;");
    str = str.replace(/>/g,"&gt;");
    str = str.replace(/\"/g,"&quot;");
    str = str.replace(/\'/g,"&#39;");
    str = str.replace(/\n/g,"<br />");
    return str;
   }

    commentTest(name,pw,content){
        if(name.length>0&&pw.length>0&&content.length>0){
            return true;
        }else{
            return false;
        }
    }
    commentWrite=()=>{
        let json=new Object();
        let name = document.querySelector('#comment-name').value;
        let pw = document.querySelector('#comment-password').value;
        let content=document.querySelector('#comment-content').value;
        let parent_seq=this.state.parent_seq;
       if(this.commentTest(name,pw,content)){
         json.name=this.ConvertSystemSourcetoHtml(name);
         json.pw=this.ConvertSystemSourcetoHtml(pw);
         json.content=this.ConvertSystemSourcetoHtml(content);
         json.parent_seq=parent_seq;
            axios.post('/commentWrite',json).then(res=>
                {
                    if(res.data){
                    alert("댓글 작성이 완료되었습니다!");
                    this.props.CommentFromParentFunction();
                    this.commentCount();
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
render(){
    
    return(
        <div>
        <form className="CommentWriteForm">	
        <p className="CommentWriteForm-header"><label>★ </label>댓글 작성</p>
        <label htmlFor="name" className="Label-name">닉네임: </label><input type="text" id="comment-name" placeholder="홍길동"></input>
        <label htmlFor="password" className="Label-password">비밀번호: </label>	<input type="password" id="comment-password" placeholder="●●●●●●"></input>
        <textarea className="CommentWriteForm-content" id="comment-content"></textarea>
        <button type="button" className="Comment-write-btn" onClick={this.commentWrite}>등록</button>
        
        </form>
        
        <div className="Comment-body">
          
            <p className="Comment-header">Comment '<b>{this.state.count}</b>' </p>
            
           {
					this.props.CommentFromParent.map(
						(item,index)=><div className="Comment-list" key={item.comment_seq} >
						<p className="Comment-writer">{item.comment_writer}</p>
                        <p className="Comment-regdate">{this.dateFormat(item.comment_regdate)}</p>
                        <img className="Comment-edit" src={editIcon}/>
                        <img className="Comment-del" src={delIcon}/>
                        <p className="Comment-content">{item.comment_content}</p> 
                  
                        </div>
					) 
			}
 
           
        </div>
        </div>
         );
    };
}
export default Comment;