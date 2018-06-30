import React, { Component } from 'react';

import './../../styles/LeftColumn.css';

class BlockClock extends Component {
    constructor(props){
        super(props);
        this.state = {timed: 1};
        this.incer = this.incer.bind(this);
    }
    componentDidMount() {
        this.timerID = setInterval(this.incer, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    incer(){
        var inc_val = this.state.timed;
        inc_val++;
        this.setState({timed: inc_val});
    }
    render() {
        var dater = new Date;
        return (
        <div className="LeftColumn-column-block">
            <p className="LeftColumn-column-block-name">Clock:</p>
            <p className="LeftColumn-column-format-time">{dater.toLocaleTimeString()}</p>
        </div>
        );
    }
}

export default BlockClock;
