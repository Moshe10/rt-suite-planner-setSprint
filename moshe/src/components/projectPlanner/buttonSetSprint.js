import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import Btn from './btnSS';


class Buttons extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        mainDivWidth: this.props.projectLength.length * 100,
        cellWidth: 100,
        firstCellWidth: 300,
        btnSprint: null
    }

    mainDivCss = {
        display: 'flex',
        width: 'max-content',
        height: 'max-content',
        marginLeft: this.state.firstCellWidth + 'px'
    }
    btnSetSprintCss = {
        fontSize: '18px',
        height: '65px',
        width: `${this.state.cellWidth}px`,
        margin: 50 + 'px',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '1px 1px 0px 2px rgba(0,0,0,0.3)',
        background: 'rgb(141,217,252)',
        cursor: 'pointer',
    }
    classforMarkSprint = {
        borderLeft: 'rgb(141,217,252) solid 3px',
        borderRight: 'rgb(141,217,252) solid 3px',
        borderBottom: 'rgb(141,217,252) solid 3px',
        width: this.props.project1.sprintLength * 100 ,
        height: '200px',
        margin: '0.5px'
    }


    createBtnForsetSprint(num) {
        let arr = [];
        let checkNum = null;
        for (let i = 0; i < num; i++) {
            let sprintNum = parseInt(i / this.props.project1.sprintLength);
            if (sprintNum != checkNum) {
                // arr.push(<div key={i} style={this.classforMarkSprint}><button key={i} style={this.btnSetSprintCss} >{<h3>{sprintNum}</h3>}</button></div>);
                arr.push(<Btn></Btn>)
                checkNum = sprintNum;
            }
        }
        this.state.btnSprint = arr.length;
        return arr;
    }
    render() {

        return (

            <div style={this.mainDivCss}>
                {this.createBtnForsetSprint(this.props.projectLength.length)}
            </div>
        );
    }
}

export default connect(state => state)(Buttons);