import React,{Component} from 'react';

import '../css/AddLink.css';
class AddLink extends Component{
	state ={
			
    };
    render(){
        
        return (
            <div className="AddLink">
                <h1>링크 수정</h1>
                <h4>홈페이지 타이틀은 수정만 가능합니다.</h4>
                <hr></hr>
                <table className="AddLink-table">
                <tr>
                    <th className="name">이름</th>
                    <th className="address">연결될 주소</th>
                    <th className="information">설명</th>
                </tr>
                <tbody>
                    <tr>
                        <td><input type="text" defaultValue="규태의 블로그"></input></td>                      
                        <td><input type="text" defaultValue="https://www.google.com/"></input></td>
                        <td><input type="text" defaultValue="홈페이지 타이틀 링크"></input></td>
                    </tr>
                </tbody>     
                </table>
                <button className="AddLink-btn">+</button><br/>
                <button className="AddLink-submit"> 확인 </button>
             </div>
            );
        };
    }
    
export default AddLink;