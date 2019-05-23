import React,{Component} from 'react';
import * as Scroll from 'react-scroll';
import LowArrow from '../img/arrow-204-48.jpg';
import HeighArrow from '../img/arrow-141-48.jpg';
import '../css/Navi.css';
class Navi extends Component{
	state ={
			
    };
    
    scrollTop=()=>{
        Scroll.animateScroll.scrollToTop();
    }
    scrollBottom=()=>{
        Scroll.animateScroll.scrollToBottom();
    }
    render(){
        
        return (
            <div className="Navi">      
                <img src={HeighArrow} className="ScrollToTop" onClick={this.scrollTop}></img><br/>
                <img src={LowArrow} className="ScrollToBottom" onClick={this.scrollBottom}></img>
             </div>
            );
        };
    }
    
export default Navi;