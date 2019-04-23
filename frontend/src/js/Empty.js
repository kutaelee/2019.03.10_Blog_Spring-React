import React,{Component} from 'react';
class Empty extends Component{
    state={height:0}
    componentDidMount(){
        this.setState({height:window.innerHeight});
    }

    render(){
        
        return (
            <div className="background" height={this.state.height}>

            </div>
        );
    };
}

export default Empty;