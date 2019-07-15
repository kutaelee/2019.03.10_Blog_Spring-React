import React from 'react';
import ClickNHold from 'react-click-n-hold'; 

export default class Example extends React.Component {
    constructor() {
        super()
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
      }
      handleButtonPress () {
        this.buttonPressTimer = setTimeout(() => alert('long press activated'), 1500);
      }
    
      handleButtonRelease () {
        clearTimeout(this.buttonPressTimer);
      }
	render(){
		return ( 
            <div 
            onTouchStart={this.handleButtonPress} 
            onTouchEnd={this.handleButtonRelease} 
            onMouseDown={this.handleButtonPress} 
            onMouseUp={this.handleButtonRelease} 
            onMouseLeave={this.handleButtonRelease}>
          Button
        </div>
		); 
	}
}