import React,{Component} from 'react';
import '../../css/subject/ModifyPage.css';
import axios from 'axios';

class ModifyPage extends Component{
    state = {
        selectSubject:false,
        subjectInfo:{subject_name:"",subject_dir:"",subject_seq:""},
        delList:[]
    };

    componentDidMount() {
        this.getSubject();
    }
    modifySubject(){
        let formData = new FormData();
        const seq=document.querySelector('.SubjectSeq').value;
        const dir=document.querySelector('.SubjectDir').value;
        const subjectName = document.querySelector('.SubjectName').value;
        const imagefile = document.querySelector('.SubjectImg');
        formData.append("subjectName",subjectName);
        formData.append("seq",seq);
        formData.append("dir",dir);
        formData.append("img", imagefile.files[0]);

        axios.post("/subjectmodify", formData, {
            headers: {
             'Content-Type': 'multipart/form-data',
             'processData': false,
             'async': false,
            'cache': false
          }
        }).then(function(res){
            if(res.data){
                alert("수정이 완료되었습니다.");
            }else{
                alert("수정 중 문제가 발생했습니다.");
            }
         
           window.location.href="/subjectlist";
          })
          .catch(function(e){
           alert("수정 중 문제가 발생했습니다."+e);
          });
        
    }

    getSubject = () =>{
		axios.get('/subjectlist').then(res=>this.setState({subjectList:res.data}));
    }
    getSubjectInfo(subject_seq){
        axios.post('/subjectinfo',{seq:subject_seq}).then(res=>this.setState({subjectInfo:res.data}));
        this.setState({selectSubject:true});
    }
    back(){
        window.location.href="/subjectlist";
    }
    deleteSubject(){
       console.log(this.state.delList); //문제
    }
    delListPush(seq){
        let className=".checkbox"+seq;
        if(document.querySelector(className).checked){
            this.setState({delList:[this.state.delList.push(seq)]});
        }else{
            this.setState({delList:[this.state.delList.splice(this.state.delList.indexOf(seq),1)]});
        }
    }
    render() {
        return (
        <div className="ModifyPage">
              <div className="ModifyBody">
              <h1>주제 수정</h1>
              <hr></hr>
            {this.state.selectSubject ? 
                    <div> 
                          <h4>대표 이미지를 수정하고싶지 않으시면 비워두시면 됩니다.</h4>
                          <h4>수정 전 대표 이미지</h4>
                          <img className="MainImg"src={this.state.subjectInfo.subject_dir}></img>
                         <form className="ModifySubjectForm" encType="multipart/form-data" method="post">
                         <input className="SubjectSeq" type="hidden" value={this.state.subjectInfo.subject_seq}></input>
                         <input className="SubjectDir" type="hidden" value={this.state.subjectInfo.subject_dir}></input>
                          <label htmlFor="SubjectName">주제명: </label><input className="SubjectName" id="SubjectName" type="text" maxLength="12" defaultValue={this.state.subjectInfo.subject_name}></input>          
                          <br/>
                          <label htmlFor="SubjectImg">대표이미지: </label><input className="SubjectImg" id="SubjectImg" type="file"></input>

                         </form>
                       
                         <button className="Modify-btn" onClick={this.modifySubject}>수정</button>
                         <button className="Back-btn" onClick={this.back}>취소</button>
                     </div>  :
                     
                <div>
                      <h4>클릭 후 수정! 체크 후 삭제!</h4>
                  <br/>
				{this.state.subjectList ? <ul className="ModifySubject-ul">
				{
					this.state.subjectList.map(
						(item)=><li className="ModifySubject-list" key={item.subject_seq}>
                        <input type="checkbox" className={'checkbox'+item.subject_seq} onChange={()=>this.delListPush(item.subject_seq)} value={item.subject_seq}/>
						<a className="Subject-name" value={item.subject_seq} onClick={()=>this.getSubjectInfo(item.subject_seq)}>{item.subject_name}</a> 
						</li>
					) 
                } <button className="Delete-btn" onClick={this.deleteSubject}>삭제</button> </ul>  : <p>주제를 불러오는중..</p>}
                </div>
            }
			</div>
        </div>
      );
 };
};

export default ModifyPage;