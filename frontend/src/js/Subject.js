import React,{Component} from 'react';
import '../css/Subject.css';
import pin from '../img/black-pin.png';
import ActivePin from '../img/black-pin-active.png';
import axios from 'axios';
import Navi from './Navi';

class Subject extends Component{
	state ={
		menuPostion:null,
		subjectList:[{subject_name:"a",subject_seq:"1",address:""}],
		mobile:false
	};

	constructor(props) {
		super(props);
	
		this.state = {
			  pinSw:false,
			  menuPostion:null,
			  curTop:190,
			  menuTop:190,
			  login:false
			};
	   this.pinClick = this.pinClick.bind(this);
	 };
	 componentDidMount() {
		this.loginSessionCheck();
		this.getSubject();
		if(this.widthCheck()){
			window.addEventListener("scroll", this.handleScroll);
		}else{
			this.setState({mobile:true});
			document.querySelector('.Subject-body').style.display="none";
		}
	}
    componentWillUnmount(){		
		if(this.widthCheck()){
		window.removeEventListener("scroll", this.handleScroll);
		}
	}
	selectSubject=(seq)=>{
		const path=window.location.pathname.split('/');
		seq+='';
		if(path[2]===''||path[2]===null){
			return 'black';
		}
		if(path[2]===seq){
			return 'red';
    }
	}
  widthCheck=()=>{
		if(document.body.clientWidth>600)
				return true;
		else
				return false;   
	}
	handleScroll=() =>{
		if(!this.state.pinSw){
		 const top =
		 	(document.documentElement && document.documentElement.scrollTop) ||
		 	document.body.scrollTop;
		const topOffset=document.querySelector('.Top').offsetTop;
			if(top===0){
				this.setState(()=>({
					menuTop:topOffset+190,
					curTop:190
				}));
			}else{
				this.setState(()=>({
					menuTop:topOffset+100,
					curTop:top+100
				}));
			}
		}

   }
	pinClick() {
		if(this.widthCheck()){
		const topOffset=document.querySelector('.Top').offsetTop;
		if(!this.state.pinSw){
			this.setState(() =>({
				menuPostion:'absolute',
				menuTop:this.state.curTop,
				pinSw:!this.state.pinSw
			}));
		}else{
			this.setState(() =>({
				menuPostion:'fixed',
				menuTop:topOffset+100,
				pinSw:!this.state.pinSw
			}));
			}
		}
	}
	subjectInsertForm(){

		//추가할 주제의 고유번호 (마지막 번호에서 1추가해서 가져옴)
		axios.get('/lastsubjectseq').then(res => window.location = "/subject/"+res.data);
	}
	getSubject = () =>{
		axios.get('/subjectlist').then(res=>this.setState({subjectList:res.data}));
	}
	getDocuemntPage(seq) {
		//주제의 첫글의 고유번호 가져옴	uri만들어서 전달 seq=서브젝트 고유번호 res.data=문서고유번호
		axios.post('/latelyseq',{subject_seq:seq}).then(res => window.location = "/document/"+seq+"/"+res.data);
	}

	ModifySubjectPage(){
		window.location="/subjectlist";
	}
	loginSessionCheck=()=>{
        axios.get("/loginsessioncheck").then(res=>{
            if(res.data)
                this.setState({login:true});
        }).catch(e=>alert("세션체크 중 문제발생!"));
		}
		subjectToggle=()=>{
			let btn=document.querySelector('.Subject-toggle-btn');
			if(btn){
				if(document.querySelector('.Subject-body').style.display==='block'){
					document.querySelector('.Subject-body').style.display='none';
					btn.innerText='▼';
			}else{
					document.querySelector('.Subject-body').style.display='block';
					btn.innerText='▲';
				}
			}
		
	}
	render(){
		return (
				<div className="Subject" style={{position:this.state.menuPostion,top:this.state.menuTop,transition:"0.5s"}}>
		
				<header className="Subject-header" onClick={()=>this.subjectToggle()}>
				{this.state.mobile ? <button className="Subject-toggle-btn">▼</button> :
				this.state.pinSw ? <img src={ActivePin} className="Active-pin" onClick={this.pinClick} alt="chock-pin"></img>  :<img src={pin} className="Subject-pin" onClick={this.pinClick} alt="Active-pin"></img>
				}	<h4 className="Subject-title">주제</h4>
				</header>
				<div className="Subject-body">
				{this.state.subjectList ? <ul className="Subject-ul">
				{
					this.state.subjectList.map(
						(item)=><li className="Subject-list" key={item.subject_seq}>
						<a className="Subject-name" href={item.address} onClick={()=>this.getDocuemntPage(item.subject_seq)} style={{color:this.selectSubject(item.subject_seq)}}>{item.subject_name}</a>
						{/* <p className="Subject-name" value={item.subject_seq} onClick={()=>this.getDocuemntPage(item.subject_seq)} style={{color:this.selectSubject(item.subject_seq)}}>{item.subject_name}</p>  */}
						</li>
					) 
				} </ul> : <p>주제를 불러오는중..</p>}
				</div>
				{this.state.login ?  
				<div className="Subject-btn-div">
				<button className="Subject-add-btn" onClick={this.subjectInsertForm}>추가</button>
				<button className="Subject-modified-btn" onClick={this.ModifySubjectPage}>수정</button>
				</div>
					: ""}
				{this.state.mobile ? "" : <Navi></Navi>}
				</div>
				);
	};
};

export default Subject;