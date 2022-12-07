import React, { Component } from 'react';
import {setState} from 'react';
import Empty from"./images/empty_slot.png"

class Slot extends Component {
    constructor(props){
        super(props);
        this.state = {
            img: Empty,
            slotfun: props.onClick,
        };
        if(props.img !== undefined){
            this.setState({img: props.img});
        }
    }
    debugger;
    render() {
        return (
            <button onClick={this.state.onClick}>
            <img src={this.state.img}></img>
            </button>)
        }
    
}

export default Slot;