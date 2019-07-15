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
            margin:0,
            listSw:false,
            listOption:'리스트 형식으로 보기',
            curDocumentNum:0,
            transVal:196,
            fristTransVal:262
        }
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
    }
    componentDidMount(){
        this.setState({margin:this.props.margin});
        this.setState({curDocumentNum:path[3]*1});
        this.sameSubjectDocument();
        this.subjectInfo();
        if(document.body.clientWidth<600){
            this.setState({transVal:165,fristTransVal:250});
        }
    }
    handleButtonPress(name) {
        console.log(name)
       if(name==="Left-btn"){
        this.buttonPressTimer = setInterval(() => this.leftSlide(this.state.margin), 100);
       }
       if(name==="Right-btn"){
        this.buttonPressTimer = setInterval(() => this.rightSlide(this.state.margin),100);
       }
        
    }
    
      handleButtonRelease () {
        clearTimeout(this.buttonPressTimer);
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
            if(margin===-this.transVal){
                this.setState({margin:0});
            }else{
                this.setState({margin:this.state.margin+this.state.transVal});
            }
        }
    }
    rightSlide(margin){
        if(margin>=-this.state.transVal*(this.state.otherDocumentList.length-1) && this.state.otherDocumentList.length>1){
            if(margin===0){
                this.setState({margin:-this.state.fristTransVal});
            }else{
                this.setState({margin:this.state.margin-this.state.transVal});
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
    
            <div className="Other-title-div"> <h4>{this.state.subjectName} 주제에 등록된 다른 글</h4> </div>
             {this.state.otherDocumentList[0] ?
             <div>
                <div className="Left-button-div"
                  onTouchStart={()=>this.handleButtonPress("Left-btn")} 
                  onTouchEnd={this.handleButtonRelease} 
                  onMouseDown={()=>this.handleButtonPress("Left-btn")} 
                  onMouseUp={this.handleButtonRelease} 
                  onMouseLeave={this.handleButtonRelease} >
                <button className="Left-btn" onClick={()=>this.leftSlide(this.state.margin)}>◀</button>

                </div>
                <div className="Right-button-div"                
                onTouchStart={()=>this.handleButtonPress("Right-btn")} 
                onTouchEnd={this.handleButtonRelease} 
                onMouseDown={()=>this.handleButtonPress("Right-btn")} 
                onMouseUp={this.handleButtonRelease} 
                onMouseLeave={this.handleButtonRelease}>
                <button className="Right-btn" onClick={()=>this.rightSlide(this.state.margin)}>▶</button>
                </div>
               
              <div className="Other-list-div" style={{marginLeft:this.state.margin,transition:"0.3s"}}>
              {this.state.listSw ? "" :
                  this.state.otherDocumentList.map(	
                        (item)=>
                        
                <span className= "Other-list" id={this.state.curDocumentNum===item.document_seq ? "curDocument" : ""} onClick= {this.state.curDocumentNum===item.document_seq ? ()=>alert("현재 선택된 글 입니다") : ()=>this.moveOtherPage(item.document_parent_seq,item.document_seq) } key={item.document_seq}> 
                    <img src={item.img} alt={item.document_title} />
                    <p>{this.dateFormat(item.document_regdate)}</p>
                    <div className="Other-title">
                    <b>{this.titleFormat(item.document_title)} </b>
                    </div>
                </span>  
          
                )  
              }
             
              </div> </div>:<h1>주제에 등록된 다른 글이 없습니다.</h1>
                    }

            </div>
        );
    };
}

export default OtherDocumentList;