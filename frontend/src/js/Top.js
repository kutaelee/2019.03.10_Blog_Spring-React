import React, {Component} from 'react';
import '../css/Top.css';
import Clock from 'react-live-clock';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Top extends Component {

	constructor() {
	      super();

	      this.state = {
                dosearch:false,
                visitCount:{visit_today:'',visit_total:''}
	     };
       }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.visitCount();
    }
    componentWillUnmount(){
    	window.removeEventListener("scroll", this.handleScroll);
    }


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
    
    visitCount=()=>{
        axios.get('/visitcount').then(res=>this.setState({visitCount:res.data}));
    }
    search=()=>{
        let keyword=document.querySelector('.Top-search').value;
        keyword=keyword.replace(/^\s*/,"");
        keyword=keyword.trim();

        if(keyword.length<=0 || !keyword){
            alert("검색어를 입력해주세요!");  
        }else{
            window.location.href="/search/"+keyword;
        }
    }

    render() {
        return (
            <div className="Top">
        
                <header id={"Top"+(this.state.scroll ? '-active' : '')} className="Top">
                      <Link to="/" id={"Top-link"+(this.state.scroll ? '-active' : '')} style={{ textDecoration: 'none',color:'white' }}>
                            <h1 id={"Top-title"+(this.state.scroll ? '-active' : '')} className="Top-title">규태의 블로그</h1>
                     </Link><br/>
                        <p className="Top-visitCount" id={"Top-search-btn"+(this.state.scroll ? '-active' : '')}>VisitCount - Today : {this.state.visitCount.visit_today} / Total :  {this.state.visitCount.visit_total}</p>
                		<input placeholder="검색어" id={"Top-search"+(this.state.scroll ? '-active' : '')} className="Top-search" type="text" maxLength="50"/>
                        <button id={"Top-search-btn"+(this.state.scroll ? '-active' : '')} className="Top-search-btn" onClick={this.search}>검색</button>
                    <h4 id={"Top-clock"+(this.state.scroll ? '-active' : '')} className="Top-clock"><Clock format={'YYYY년 Mo Do dddd A h:mm:ss zz'} ticking={true}></Clock>KST</h4>
                 
                </header>
            </div>
        );
    };
}

export default Top;