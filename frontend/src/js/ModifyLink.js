import React,{Component} from 'react';
import '../css/ModifyLink.css';
import axios from 'axios';

class ModifyLink extends Component{
	state ={
        linkList:[{link_seq:'',link_name:'',link_address:'',link_info:'',link_tag:''}]
    };
    componentDidMount(){
        this.getLink();
    }
    getLink=()=>{
        axios.get("/alllinklist").then(res=>this.setState({linkList:res.data}));
    }
    render(){
        
        return (
            <div className="ModifyLink">
                <h1>링크 수정</h1>
                <h4>체크박스를 클릭한 리스트만 수정리스트에 포함됩니다.</h4>
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
                    <tr>
                        <td><input type="checkbox"></input></td>
                        <td><input type="text" defaultValue={item.link_name}></input></td>                      
                        <td><input type="text" defaultValue={item.link_address}></input></td>
                        <td><input type="text" defaultValue={item.link_info}></input></td>
                        <td>{item.link_tag}</td>
                    </tr>
                    )}
                </tbody>
                </table>
                <button className="Link-modify-btn">수정</button>
             </div>
            );
        };
    }
    
export default ModifyLink;