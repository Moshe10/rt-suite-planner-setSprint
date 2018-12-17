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
  
    createBtnForsetSprint(num) {
        let arr = [];
        let checkNum = null;
        for (let i = 0; i < num; i++) {
            let sprintNum = parseInt(i / this.props.projectFromDB.sprintLength);
            if (sprintNum != checkNum) {
                arr.push(<Btn
                          sprintnum={sprintNum}
                          key={i}
                         >
                        </Btn>)
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