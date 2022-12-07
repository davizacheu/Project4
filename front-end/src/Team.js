import React, { Component } from 'react';
import Search from './Search';
import Slot from './Slot';


class Team extends Component {
    constructor(props) {
    super(props);
    this.state = {
      slots: Array(6).fill(null),
      showteam: props.show,
      slotfun: props.function,
    };
    // if(props.show !== undefined){
    //   this.setState({show: props.show});
    // }
  }
  
  renderSlot(i) {
    return (
      <Slot
      />
    );
  }
 
  render(){
      if(!this.state.showteam){
          return null;
      }
      else{
          return(
              <div>
        <div className="board-row">
          {this.renderSlot(0)}
          {this.renderSlot(1)}
          {this.renderSlot(2)}
        </div>
        <div className="board-row">
          {this.renderSlot(3)}
          {this.renderSlot(4)}
          {this.renderSlot(5)}
        </div>
      </div>
              );
      }
  }
}

export default Team;