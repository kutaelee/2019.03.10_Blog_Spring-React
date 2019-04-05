import React,{Component} from 'react';
import axios from 'axios';
import Editor from 'tui-editor';
import '../../css/document/DocWritePage.css';
import 'tui-color-picker/dist/tui-color-picker.min';
import 'tui-editor/dist/tui-editor-extColorSyntax';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import 'tui-color-picker/dist/tui-color-picker.min.css';
let toastEditor;

class DocModifyPage extends Component{
   
    state={
        textLength:0,
        doc:{document_title:'',document_content:'',document_seq:'',docuemnt_dir:'',document_parent_seq:''}
    }
    componentDidMount(){
        this.loginSessionCheck();
        toastEditor = new Editor({
            el: document.querySelector('#editSection'),
            initialEditType: 'wysiwyg', // 'markdown'
            previewStyle: 'vertical',
            height:'600px',
            minHeight: '600px',           
            exts: ['colorSyntax']
        });
        window.addEventListener("keyup", this.keyupArticle);
        this.documentInfo();
    };

      loginSessionCheck=()=>{
        axios.get("/loginsessioncheck").then(res=>{
            if(!res.data){
                alert("로그인 후 이용가능 합니다.");
                window.history.back();
            }
        }).catch(e=>alert("세션체크 중 문제발생!"));
      }

    componentWillUnmount(){
        window.removeEventListener("keyup", this.keyupArticle);
    }   
    documentInfo(){
		let path=window.location.pathname.split('/');
        axios.post("/document",{seq:path[3]}).then(res=>{
            const text=document.querySelectorAll(".tui-editor-contents");
            this.setState({doc:res.data});
            text[1].innerHTML=res.data.document_content;
            this.setState({textLength:text[1].innerHTML.length});
            document.querySelector('.title').value=res.data.document_title;
    });
    }
    innerTextLength(content){
        let len=0;
        for(let i=0;i<content.length;i++){
            len+=content[i].innerText.length;
        }
        return len;
    }
    keyupArticle=()=>{
        const text=document.querySelectorAll(".tui-editor-contents");
        this.setState({textLength:text[1].innerText.length});
    }
    saveArticle(dir,seq){
        const text=document.querySelectorAll(".tui-editor-contents");
        const title= document.querySelector('.title').value;
        if(text[1].innerText.length>2500){
            alert("글자 수 제한은 2500자 입니다.");
        }else if(title.length<=0){
            alert("제목은 필수 입니다.");
        }else{
            let path=window.location.pathname.split('/');
            const content = toastEditor.getHtml();
            axios.post('/documentmodify',{content:content,title:title,dir:dir,seq:seq})
            .then(res => {
                if(res.data){
                    alert("수정이 완료되었습니다!");
                    window.location = "/document/"+path[2]+"/"+path[3];    
                }else{
                    alert("권한이 없습니다.");
                }
           }).catch(e=>alert("글 수정 중 에러가 발생했습니다."));
        }

    };
    cancelClick=()=>{
        if(window.confirm("수정하신 내용을 저장하지 않고 페이지를 나갑니다\n그래도 괜찮으시겠습니까?")){
            window.history.back();
        }
    }
    render(){
        return(
            <div className="DocWritePage">
            <div className="DocWritePage-title">
              
                <p className="Doc-textLength">텍스트 제한: {this.state.textLength} / 2500자</p>
                <input type="text" className="title" placeholder="제목" maxLength="100"></input>
            </div>
                <div id="toastEditor">
                    <div id="editSection"></div>
                </div>
                <button className="Cancel-btn" onClick={()=>this.cancelClick()}>취소</button>
                <button onClick={()=>this.saveArticle(this.state.doc.document_dir,this.state.doc.document_seq)} className="Save-btn">수정</button>
            </div>
        );
    };
}

export default DocModifyPage;