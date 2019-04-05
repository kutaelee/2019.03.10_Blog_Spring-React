import React, {Component} from 'react';
import '../css/LoginBox.css';
import axios from 'axios';

class LoginBox extends Component {
    state={
        login:false,
        top:250
    }
    componentDidMount() {
        if(this.widthCheck()){
            window.addEventListener("scroll", this.handleScroll);
        }else{
            this.setState({top:150});
        }
        this.loginSessionCheck();
      
    }
    componentWillUnmount(){
        if(this.widthCheck()){
          window.removeEventListener("scroll", this.handleScroll);
        }
    }
    widthCheck=()=>{
        if(document.body.clientWidth>600)
            return true;
        else
            return false;   
    }
    handleScroll=() =>{
        const top =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
        const topOffset=document.querySelector('.Top').offsetTop;
        if(top===0){
            this.setState({top:topOffset+250});
        }else{
            this.setState({top:topOffset+100});
        }
    }
    loginToggle=()=>{
        if(document.querySelector('.Login-body').style.display==='block'){
            document.querySelector('.Login-body').style.display='none';
            document.querySelector('.Login-head b').innerText='▼';
        }else{
            document.querySelector('.Login-body').style.display='block';
            document.querySelector('.Login-head b').innerText='▲';
        }
		
    }

    login=()=>{
       const id=document.getElementById('Login-id').value;
       const pw=document.getElementById('Login-pw').value;
       axios.post("/login",{id:id,pw:pw}).then(res=>{
           if(res.data){
               this.setState({login:true});
               alert("로그인 완료");
               window.location.reload();
           }else{
               alert("일치하는 정보가 없습니다.");
           }
       }).catch(e=>alert("로그인 중 문제발생!"));
    }
    logout=()=>{
        axios.get("/logout").then(res=>{
            if(res.data){
                this.setState({login:false});
                alert("로그아웃이 완료되었습니다!");
                window.location.reload();
            }
        }).catch(e=>alert("로그아웃 중 문제발생!"));
    }
    loginSessionCheck=()=>{
        axios.get("/loginsessioncheck").then(res=>{
            if(res.data)
                this.setState({login:true});
        }).catch(e=>alert("세션체크 중 문제발생!"));
    }
    modifyLink=()=>{
        window.location.href="/modifylink";
    }
    addLink=()=>{
        window.location.href="/addLink";
    }
    render() {
        return (  
            <div className="LoginBox" style={{top:this.state.top,transition:"0.5s"}}>
          
            {this.state.login ? 
            <div className="Logout-body">
                 
            <h4 className="Login-head">관리자 메뉴</h4>
            <button onClick={this.addLink}>링크추가</button>
            <button onClick={this.modifyLink}>링크관리</button>
            <button onClick={this.logout}>로그아웃</button> 
  
            </div>:
            <div>
           <h4 className="Login-head" onClick={this.loginToggle}>로그인<b>▼</b></h4> 
              <div className="Login-body">
              <label htmlFor="Login-id">아이디</label><br/> <input type="text" id="Login-id" placeholder="ID" maxLength="20"></input><br/>
              <label htmlFor="Login-pw">비밀번호</label> <br/><input type="password" id="Login-pw" placeholder="●●●●" maxLength="20"></input><br/>
            <button className="Login-btn" onClick={this.login}>로그인</button>
            </div> 
            </div>
            } 
               
            </div>
        );
    }
}

export default LoginBox;