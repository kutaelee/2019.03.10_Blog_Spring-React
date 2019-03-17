import React, {Component} from 'react';
import '../css/Top.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Top extends Component {
	state ={
			
	};
	constructor() {
	      super();

	      this.state = {
	    		dosearch:false,
	     };
	   }
    componentDidMount() {
        setInterval(this.Top, 1000*10);
        window.addEventListener("scroll", this.handleScroll);

    }
    componentWillUnmount(){
    	window.removeEventListener("scroll", this.handleScroll);
    }

    Top = () => {
    	axios.get('/clock').then(res => this.setState({message:res.data}));
    };
    handleScroll=() =>{
    	 const top =
             (document.documentElement && document.documentElement.scrollTop) ||
             document.body.scrollTop;
         if(top > 0){
         	this.setState({scroll:true});
         }else{
         	this.setState({scroll:false});
         }
    }
 
    
    render() {
        return (
            <div className="Top">
                <header id={"Top"+(this.state.scroll ? '-active' : '')} className="Top">
                      <Link to="/" style={{ textDecoration: 'none',color:'white' }}>
                            <h1 id={"Top-title"+(this.state.scroll ? '-active' : '')} className="Top-title">규태의 블로그</h1>
                     </Link>
                		<input placeholder="검색어" id={"Top-search"+(this.state.scroll ? '-active' : '')} className="Top-search" type="text"/>
                        <button id={"Top-search-btn"+(this.state.scroll ? '-active' : '')} className="Top-search-btn">검색</button>
                    <h4 id={"Top-clock"+(this.state.scroll ? '-active' : '')} className="Top-clock">{this.state.message}</h4>
                </header>
            </div>
        );
    };
}

export default Top;