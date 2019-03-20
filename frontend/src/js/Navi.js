import React,{Component} from 'react';
import * as Scroll from 'react-scroll';
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
                <h4>Navigation</h4>
               <button className="ScrollToTop" onClick={this.scrollTop}>Top</button>
               <button className="ScrollToBottom" onClick={this.scrollBottom}>Bottom</button>
       
             </div>
            );
        };
    }
    
export default Navi;