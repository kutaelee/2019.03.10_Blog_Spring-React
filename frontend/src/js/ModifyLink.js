import React,{Component} from 'react';
import '../css/ModifyLink.css';
import axios from 'axios';

class ModifyLink extends Component{
	state ={
        linkList:[{link_seq:'',link_name:'',link_address:'',link_info:'',link_tag:''}],
        delList:[]
       
    };
    componentDidMount(){
        this.loginSessionCheck();
        this.getLink();
    }
    getLink=()=>{
        axios.get("/alllinklist").then(res=>this.setState({linkList:res.data}));
    }

    loginSessionCheck=()=>{
        axios.get("/loginsessioncheck").then(res=>{
            if(!res.data){
                alert("로그인 후 이용가능 합니다.");
                window.history.back();
            }
        }).catch(e=>alert("세션체크 중 문제발생!"));
    }

    delListPush=(seq)=>{
        let className=".checkbox"+seq;
        
        if(document.querySelector(className).checked){
            this.setState(()=>this.state.delList.push(seq));
        }else{    
            this.setState(()=>[this.state.delList.splice(this.state.delList.indexOf(seq),1)]);
        }
    }
    linkDelete=()=>{
        axios.post("/linkdelete",{list:this.state.delList}).then(res=>{
            if(res.data){
                alert("링크 삭제완료!");
                window.location.reload();
            }else{
                alert("권한이 없습니다.");
            }
        }).catch(e=>alert("링크 삭제중 문제발생!"));
    }
    linkModify=()=>{
        const linkList=this.state.linkList;
        let name=[];
        let address=[];
        let info=[];
        let seq=[];
        let linkSeq;
        let checkboxSW=false;
        for(let i=0;i<linkList.length;i++){
            linkSeq=linkList[i].link_seq;
            if(document.querySelector(".checkbox"+linkSeq).checked){
                checkboxSW=true;  
                seq.push(linkSeq);
                name.push(document.getElementById("name"+linkSeq).value);
                address.push(document.getElementById("addr"+linkSeq).value);
                info.push(document.getElementById("info"+linkSeq).value);
            }
        }
        if(checkboxSW){
            axios.post("/modifylink",{seq:seq,name:name,address:address,info:info}).then(res=>{
                if(res.data){
                    alert("수정이 완료되었습니다.");
                    window.location.reload();
                }else{
                    alert("권한이 없습니다.");
                }
            }).catch(e=>alert("링크 수정중 문제발생!"));
        }else{
            alert("체크된 리스트가 한개도 없습니다.");
        }
     }
    render(){
        
        return (
            <div className="ModifyLink">
                <h1>링크 관리</h1>
                <h4>체크박스를 클릭한 리스트만 수정/삭제에 포함됩니다.</h4>
                <hr></hr>
                <table className="ModifyLink-table">
                <tbody>
                <tr>
                    <th className="check">체크</th>
                    <th className="name">이름</th>
                    <th className="address">연결될 주소</th>
                    <th className="information">설명</th>
                    <th className="tag">위치</th>
                </tr>
                {
					this.state.linkList.map(
						(item)=>
                    <tr key={item.link_seq}>
                        <td><input type="checkbox" className={"checkbox"+item.link_seq} disabled={item.link_tag==='top' ? "disabled" : ""}onClick={()=>this.delListPush(item.link_seq)}></input></td>                    
                        <td><input type="text" defaultValue={item.link_name} id={"name"+item.link_seq} maxLength="20"></input></td>                      
                        <td><input type="text" defaultValue={item.link_address} id={"addr"+item.link_seq} maxLength="150"></input></td>
                        <td><input type="text" defaultValue={item.link_info} id={"info"+item.link_seq} maxLength="250"></input></td>
                        <td>{item.link_tag}</td>
                    </tr>
                    )}
                </tbody>
                </table>
                <button className="Link-modify-btn" onClick={this.linkModify}>수정</button>
                <button className="Link-delete-btn" onClick={this.linkDelete}>삭제</button>
             </div>
            );
        };
    }
    
export default ModifyLink;