import React,{Component} from 'react';
import '../../css/search/Search.css';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
const path=window.location.pathname.split('/');
class Search extends Component{
	state ={
            resultDoc:[{document_seq:'',document_title:'',document_parent_seq:'',document_regdate:'',subject_name:''}],
            keyword:'',
            searchPageNumber:[1],
            curPageNum:1,
            searchCount:0,
            searchSw:false

    };
    componentDidMount(){
        this.searchCount();
    }
    keywordCheck=()=>{
        return decodeURI(path[2]);
    }
    dateFormat(regdate){
        return moment(regdate).format('ll');
    }

    moveDocument(parent,seq){
        window.location.href="/document/"+parent+"/"+seq;
    }

    contentListPage(page)
    {
        let keyword=decodeURI(path[2]);
        axios.post('/searchdocument',{keyword:keyword,page:page}).then(res=>this.setState({resultDoc:res.data,searchSw:true}));
        page*=1;
        if(!page){
            page=1;
        }
		let oldEl=document.getElementById('pageNum'+this.state.curPageNum);
		let curEl=document.getElementById('pageNum'+(page));
		if(oldEl){
			oldEl.style.color='black';
        }
		this.setState({curPageNum:page});
		if(curEl){
			curEl.style.color='red';
		}
	}
    searchCount=()=>{
        let keyword=decodeURI(path[2]);
        axios.post("/searchcount",{keyword:keyword}).then(res=>{
            this.setState({searchCount:res.data});
            this.pagingCount(res.data);     
        });
    }
	pagingCount=(count)=>{
        let arr=[];
        let pageCount=0;
        if(count/10<10){
                pageCount=Math.floor(count/10)+1;
        }else{
            pageCount=10;
        }
		let i=1;
		if(pageCount===0){
			pageCount=1;
        }
        for(i; i <= pageCount; i++) {
             arr.push(i);
        }
		 this.setState({curPageNum:1});
         this.setState({searchPageNumber:arr});
         this.contentListPage();
	}
	leftPaging=(count)=>{

		if(count>10){
			if(count%10==0){
				count=(count-count%10)-11;
			}else{
				count=(count-count%10)-10;
			}
				let arr=[];
				let mul=Math.floor(count/10);
				let j=10;
				if(mul===0){
					mul=1;
					j=0;
				}
				let i=j*mul+1;
				let pageCount=i+9;
				for(i;i<=pageCount;i++){
					arr.push(i);
				}
				this.setState({curPageNum:pageCount});
				this.setState({searchPageNumber:arr});
				this.contentListPage(pageCount+"");
			}else{
                this.setState({curPageNum:1});
                this.contentListPage(1+"");
            }
	}
	rightPaging=(count)=>{
        let	maxCount=0;
        if(Math.floor(this.state.searchCount%10===0)){
            maxCount=Math.floor(this.state.searchCount/10);
        }else{
            maxCount=Math.floor(this.state.searchCount/10)+1;
        }
		
		if(count%10!=0){
			count=(count-count%10)+10;
		}else{
			count=(count-count%10);
		}
		if(count<maxCount){
				let arr=[];
                let mul=Math.floor(count/10);
				let j=10;
                let i=j*mul+1;
                this.setState({curPageNum:i});
                this.contentListPage(i+"");
				let pageCount=i+9;
				if(i+9>maxCount){
					pageCount=maxCount;
				}		
				for(i;i<=pageCount;i++){
					arr.push(i);
                }
				this.setState({searchPageNumber:arr});

			}else{
                this.setState({curPageNum:maxCount});
                this.contentListPage(maxCount+"");
            }
    }
    
    render(){
        
        return (
            <div className="Search">
            {this.state.searchCount ?  
            <div>
            <div className="Search-body">

            <h4 className="Search-head">˝<b>{this.keywordCheck()}</b>˝ 검색어가 제목 또는 내용에 포함되는 글</h4>
        
            <table className="Result-table">
         <tbody>
            <tr>
                <th className="Title-head">제목</th>
                <th className="Regadate-head">작성날짜</th>
                <th className="Subject-head">주제</th>
            </tr>
            {this.state.resultDoc.map(
						(item)=><tr className="Result-list" key={item.document_seq} onClick={()=>this.moveDocument(item.document_parent_seq,item.document_seq)}>
                 <td>{item.document_title}</td>
                 <td>{this.dateFormat(item.document_regdate)}</td>
                 <td>{item.subject_name}</td>
            </tr> )
            }
            </tbody>
            </table>
            </div>
            <div className="Paging">
                   <button className="Paging-left-btn" onClick={()=>this.leftPaging(this.state.curPageNum)}>◀</button>
                   {this.state.searchPageNumber.map((item)=><a className="Search-pageNumber" id={"pageNum"+item} onClick={()=>this.contentListPage(item+"")} style={{color: item===this.state.curPageNum ? "red" : "black" }} key={item}>{item}</a>)}
                  <button className="Paging-right-btn" onClick={()=>this.rightPaging(this.state.curPageNum)}>▶</button>
            </div> 
            </div>
            : this.state.searchSw ? 
                <h1 className="Search-empty">˝<b>{this.keywordCheck()}</b>˝ 검색어가 포함되는 글이 한개도 없습니다.</h1> 
                : <h1 className="Search-loading">˝<b>{this.keywordCheck()}</b> 검색 중...</h1> 
            }
            </div>
             
        );
    };
}

export default Search;