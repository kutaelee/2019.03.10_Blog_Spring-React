import React,{Component} from 'react';
import '../css/Subject.css';
import pin from '../img/black-pin.png';
import ActivePin from '../img/black-pin-active.png';
import axios from 'axios';
import Navi from './Navi';

class Subject extends Component{
	state ={
		menuPostion:null,
		subjectList:[{subject_name:"a",subject_seq:"1"}]
	};

	constructor(props) {
		super(props);
	
		this.state = {
			  pinSw:false,
			  menuPostion:'fixed',
			  curTop:250,
			  menuTop:250
			
			};
	   this.pinClick = this.pinClick.bind(this);
	 };
	 componentDidMount() {
				this.GetSubject();
				window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount(){
			window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll=() =>{
		if(!this.state.pinSw){
		const top =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
			this.setState(()=>({
				curTop:top+250
			}));
		}

   }
	pinClick() {

		if(!this.state.pinSw){
			this.setState(() =>({
				menuPostion:'absolute',
				menuTop:this.state.curTop,
				pinSw:!this.state.pinSw
			}));
		}else{
			this.setState(() =>({
				menuPostion:'fixed',
				menuTop:250,
				pinSw:!this.state.pinSw
			}));
		}
	};
	SubjectInsertForm(){

		//추가할 주제의 고유번호 (마지막 번호에서 1추가해서 가져옴)
		axios.get('/lastsubjectseq').then(res => window.location = "/subject/"+res.data);
	}
	GetSubject = () =>{
		axios.get('/subjectlist').then(res=>this.setState({subjectList:res.data}));
	}
	getDocuemntPage(seq) {
		//주제의 첫글의 고유번호 가져옴	uri만들어서 전달 seq=서브젝트 고유번호 res.data=문서고유번호
		axios.post('/latelyseq',{subject_seq:seq}).then(res => window.location = "/document/"+seq+"/"+res.data);
	}
	ModifySubjectPage(){
		window.location="/subjectlist";
	}
	render(){
		return (
				<div className="Subject" style={{position:this.state.menuPostion,top:this.state.menuTop}}>
				<header className="Subject-header">
				{this.state.pinSw ? <img src={ActivePin} className="Active-pin" onClick={this.pinClick} alt="chock-pin"></img>  :<img src={pin} className="Subject-pin" onClick={this.pinClick} alt="Active-pin"></img>}
					<h4 className="Subject-title">주제</h4>
				</header>
				<div className="Subject-body">
				{this.state.subjectList ? <ul className="Subject-ul">
				{
					this.state.subjectList.map(
						(item)=><li className="Subject-list" key={item.subject_seq}>
						<p className="Subject-name" value={item.subject_seq} onClick={()=>this.getDocuemntPage(item.subject_seq)}>{item.subject_name}</p> 
						</li>
					) 
				} </ul> : <p>주제를 불러오는중..</p>}
				</div>
				
				<button className="Subject-add-btn" onClick={this.SubjectInsertForm}>추가</button>
				<button className="Subject-modified-btn" onClick={this.ModifySubjectPage}>수정</button>
				<Navi></Navi>
				</div>
				);
	};
};

export default Subject;