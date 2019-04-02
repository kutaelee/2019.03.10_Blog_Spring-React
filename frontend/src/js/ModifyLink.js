import React,{Component} from 'react';

import '../css/ModifyLink.css';
class ModifyLink extends Component{
	state ={
			
    };
    

    render(){
        
        return (
            <div className="ModifyLink">
                <h1>링크 수정</h1>
                <h4>체크박스를 클릭한 리스트만 수정리스트에 포함됩니다.</h4>
                <hr></hr>
                <table className="ModifyLink-table">
                <tr>
                    <th className="check">체크</th>
                    <th className="name">이름</th>
                    <th className="address">연결될 주소</th>
                    <th className="information">설명</th>
                </tr>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></input></td>
                        <td><input type="text" defaultValue="규태의 블로그"></input></td>                      
                        <td><input type="text" defaultValue="https://www.google.com/"></input></td>
                        <td><input type="text" defaultValue="홈페이지 타이틀 링크"></input></td>
                    </tr>
                </tbody>
                </table>
                <button>수정</button>
             </div>
            );
        };
    }
    
export default ModifyLink;