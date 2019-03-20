import React,{Component} from 'react';
class CommentWriteForm extends Component{
render(){
    return(
        <div>
        <form className="CommentWriteForm">	
        <p className="CommentWriteForm-header"><label>★ </label>댓글 작성</p>
        <label htmlFor="name" className="Label-name">닉네임: </label><input type="text" id="name" placeholder="홍길동"></input>
        <label htmlFor="password" className="Label-password">비밀번호: </label>	<input type="password" id="password" placeholder="●●●●●●"></input>
        <textarea className="CommentWriteForm-content"></textarea>
        <button className="Comment-write-btn">등록</button>
        
        </form>
        <div className="Comment">
            <p className="Comment-header">Comment(0)</p>
            <hr/>
        </div>
        </div>
         );
    };
}
export default CommentWriteForm;