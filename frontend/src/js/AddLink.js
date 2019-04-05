import React,{Component} from 'react';
import '../css/AddLink.css';
import axios from 'axios';
class AddLink extends Component{
	state ={
			
    };
    componentDidMount(){
        this.loginSessionCheck();
    }
    loginSessionCheck=()=>{
        axios.get("/loginsessioncheck").then(res=>{
            if(!res.data){
                alert("로그인 후 이용가능 합니다.");
                window.history.back();
            }
        }).catch(e=>alert("세션체크 중 문제발생!"));
    }
    addList=()=>{
        const str="<tr>"+
        '<td><input type="text" placeholder="링크이름" max-length="50" class="link_name"></input></td>'+                     
        '<td><input type="text" placeholder="연결될 주소" max-length="150" class="link_address"></input></td>'+
        '<td><input type="text" placeholder="링크 설명" max-length="250" class="link_info"></input></td>'+
    "</tr>";
        document.querySelector('.AddLink-tbody').insertAdjacentHTML( 'beforeend', str );
    }
    addLink=()=>{
        const name=document.querySelectorAll(".link_name");
        const address=document.querySelectorAll(".link_address");
        const info=document.querySelectorAll(".link_info");
        let nameArray=[];
        let addrArray=[];
        let infoArray=[];
        for(let i=0;i<name.length;i++){
            if(!name[i].value||!address[i].value||!info[i].value){ 
                alert("공란을 채워주세요!");
                break;
            }
            nameArray.push(name[i].value);
            addrArray.push(address[i].value);
            infoArray.push(info[i].value);
        }
        axios.post("/addLink",{name:nameArray,address:addrArray,info:infoArray}).then(res=>
                {
                    if(res.data){
                         alert("링크 추가가 완료되었습니다!");
                         window.location.reload();
                    }else{
                        alert("권한이 없습니다.");
                    }
            }).catch(e=>alert("링크추가 시 문제가 발생했습니다.")); 
    }   
    render(){
        
        return (
            <div className="AddLink">
                <h1>링크 추가</h1>
                <h4>추가되는 순서는 랜덤이며 홈페이지 타이틀은 수정만 가능합니다.</h4>
                <hr></hr>
                <table className="AddLink-table">
                <tbody className="AddLink-tbody">
                <tr>
                    <th className="name">이름</th>
                    <th className="address">연결될 주소</th>
                    <th className="information">설명</th>
                </tr>
        
                    <tr>
                        <td><input type="text" placeholder="링크이름" maxLength="50" className="link_name"></input></td>                      
                        <td><input type="text" placeholder="연결될 주소" maxLength="150" className="link_address"></input></td>
                        <td><input type="text" placeholder="링크 설명" maxLength="250" className="link_info"></input></td>
                    </tr>
                </tbody>     
                </table>
                <button className="AddLink-btn" onClick={this.addList}>+</button><br/>
                <button className="AddLink-submit" onClick={this.addLink}> 확인 </button>
             </div>
            );
        };
    }
    
export default AddLink;