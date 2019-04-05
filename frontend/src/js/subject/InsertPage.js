import React,{Component} from 'react';
import '../../css/subject/InsertPage.css';
import axios from 'axios';

class InsertPage extends Component{
    state = {};

    componentDidMount() {
      this.loginSessionCheck();
  }
    loginSessionCheck=()=>{
      axios.get("/loginsessioncheck").then(res=>{
          if(!res.data){
              alert("로그인 후 이용가능 합니다.");
              window.history.back();
          }
      }).catch(e=>alert("세션체크 중 문제발생!"));
    }
    InserSubject(){
        let formData = new FormData();
        const subjectName = document.querySelector('.SubjectName').value;
        const imagefile = document.querySelector('.SubjectImg');
        if(subjectName&&imagefile.files[0]){
          formData.append("subjectName",subjectName);
          formData.append("img", imagefile.files[0]);
          axios.post(window.location.pathname, formData, {
              headers: {
               'Content-Type': 'multipart/form-data',
               'processData': false,
               'async': false,
              'cache': false
            }
          }).then(function(){
             alert("주제가 등록되었습니다.");
             window.location.href="/";
            })
            .catch(function(e){
             alert("주제등록 중 문제가 발생했습니다."+e);
            });
        }else{
          alert("빈값을 채워주세요!");
        }
        
    }
    render() {
           return (
           <div className="InsertSubjectPage">
               <h1>주제 추가</h1>
               <hr></hr>
               <br/>
               <form className="InsertSubjectForm" encType="multipart/form-data" method="post">
                <label htmlFor="SubjectName">주제명: </label><input className="SubjectName" id="SubjectName" type="text" maxLength="12"></input>          
                <br/>
                <label htmlFor="SubjectImg">대표이미지: </label><input className="SubjectImg" id="SubjectImg" type="file"></input>
               </form>
               <button className="InsertSubjectBtn" onClick={this.InserSubject}>등록</button>
           </div>
         );
    };
};

export default InsertPage;