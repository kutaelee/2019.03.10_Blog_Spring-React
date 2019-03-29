import React,{Component} from 'react';
import '../../css/document/OtherDocumentList.css';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
const path=window.location.pathname.split('/');

class OtherDocumentList extends Component{

    constructor(props) {
		super(props);
	
		this.state = {
            subjectName:'',
            otherDocumentList:[{document_seq:'',document_title:'',document_parent_seq:'',img:'',document_regdate:''}],
            margin:0
        }
    }
    componentDidMount(){
        this.sameSubjectDocument();
        this.subjectInfo();
    }
    dateFormat(regdate){
		return new moment(regdate).startOf().fromNow();
    }
    subjectInfo(){
        axios.post('/subjectinfo',{seq:path[2]}).then(res=>this.setState({subjectName:res.data.subject_name}));
    }
    sameSubjectDocument(){
        axios.post('/samesubjectdocumentlist',{parentSeq:path[2],seq:path[3]}).then(res=>this.setState({otherDocumentList:res.data}));
    }
    leftSlide(margin){
        if(margin<0){
            if(margin===-200){
                this.setState({margin:0});
            }else{
                this.setState({margin:this.state.margin+190});
            }
        }
    }
    rightSlide(margin){
        if(margin>=-190*(this.state.otherDocumentList.length-3) && this.state.otherDocumentList.length>3){
            if(margin===0){
                this.setState({margin:this.state.margin-200});
            }else{
                this.setState({margin:this.state.margin-190});
            }
        }
    }
    titleFormat(title){
          if(title.length>30){
              return title.substring(0,30)+"\n ...";
          }
          return title;
    }
    moveOtherPage(parentSeq,documentSeq){
        window.location.href="/document/"+parentSeq+"/"+documentSeq
    }
    render(){
        return(
            <div className="OtherDocumentList">
                <div className="Left-button-div">
                <button className="Left-btn"  onClick={()=>this.leftSlide(this.state.margin)}>◀</button>
                </div>
                <div className="Right-button-div">
                <button className="Right-btn" onClick={()=>this.rightSlide(this.state.margin)}>▶</button>
                </div>
               
                <div className="Other-title-div"> <h4>{this.state.subjectName} 주제에 등록된 다른 글</h4></div>
                {this.state.otherDocumentList[0] ?
              <div className="Other-list-div" style={{marginLeft:this.state.margin,transition:"0.3s"}}>
             
                  {this.state.otherDocumentList.map(	
                        (item)=>
                <span className="Other-list" onClick={()=>this.moveOtherPage(item.document_parent_seq,item.document_seq)} key={item.document_seq}>
                    <img src={item.img} alt={item.document_title} />
                    <p>{this.dateFormat(item.document_regdate)}</p>
                    <div className="Other-title">
                    <b>{this.titleFormat(item.document_title)} </b>
                    </div>
                </span>
         
              ) }
              
             
              </div>:<h1>주제에 등록된 다른 글이 없습니다.</h1>
                    }
            </div>
        );
    };
}
export default OtherDocumentList;