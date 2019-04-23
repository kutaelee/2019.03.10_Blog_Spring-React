import React,{Component} from 'react';
import '../css/Footer.css';
import axios from 'axios';

class Footer extends Component{
	state ={
        linkList:[{link_seq:'',link_name:'',link_address:''}]
    };
    componentDidMount(){
        this.getFooterLink();
    }
    getFooterLink=()=>{
        axios.post("/taglinklist",{tag:"footer"}).then(res=>this.setState({linkList:res.data}));
    }
    render(){
        
        return (
            <div className="Footer">

            <div className="Link">
            {this.state.linkList.map(
						(item)=><a href={item.link_address}  target = "blank" rel="noopener noreferrer" key={item.link_seq}>{item.link_name}</a>
            )}
            </div>

            </div>
        );
    };
}

export default Footer;