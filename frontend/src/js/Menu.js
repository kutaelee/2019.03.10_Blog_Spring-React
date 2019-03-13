import React,{Component} from 'react';
import '../css/Menu.css';
import pin from '../img/black-pin.png';
import ActivePin from '../img/black-pin-active.png';
import axios from 'axios';

class Menu extends Component{
	state ={
		menuPostion:null

	};
	constructor(props) {
		super(props);
	
		this.state = {
			  pinSw:false,
			  menuPostion:'fixed',
			  curTop:0,
			  menuTop:250
	   };
	   this.pinClick = this.pinClick.bind(this);
	 };
	 componentDidMount() {
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
			console.log(this.state.curTop);
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

	render(){
		return (
				<div className="Menu" style={{position:this.state.menuPostion,top:this.state.menuTop}}>
				<header className="Menu-header">
				{this.state.pinSw ? <img src={ActivePin} className="Active-pin" onClick={this.pinClick}></img> :<img src={pin} className="Menu-pin" onClick={this.pinClick}></img>}
					<h4 className="Menu-title">주제</h4>
				</header>
				<div className="Menu-body">
				<a>예시 메뉴</a> <button>수정</button>
				</div>
				<button className="Menu-add-btn">추가</button>
				</div>
				);
	};
};

export default Menu;