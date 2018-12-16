import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import store from '../../store/store';
import {updateToggleSetSprinToFalse} from '../../actions/actions';


class Btn extends Component{
    constructor(props){
        super(props);
        this.hendleclick = this.hendleclick.bind(this);
    }

    btnSetSprintCss = {
        fontSize: '18px',
        height: '65px',
        width: `100px`,
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

    hendleclick(sprintnum){
        store.dispatch(updateToggleSetSprinToFalse(sprintnum))
    }

    render(){

        return(
            <div>
                <div key={this.props.divKye} style={this.classforMarkSprint}>
                    <button onClick={() => this.hendleclick(this.props.sprintnum)}
                     key={this.props.btnKye} style={this.btnSetSprintCss}>
                     {<h3>{this.props.sprintnum}</h3>}
                     </button>
                </div>
            </div>
        )
    }
}
export default connect(state => state)(Btn);

