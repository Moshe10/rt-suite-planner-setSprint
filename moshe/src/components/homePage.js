import React, { Component } from 'react';
import store from '../store/store';
import { connect } from "react-redux";
import { saveData, startProject, savePercentage, createSprints, saveResulutionFromHomePage, DeleteAll, DeleteLast } from '../actions/actions'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import $ from 'jquery';
import CheckedSelect from 'react-select-checked';
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import App from '../App';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';


/**Here the project manager will enter the parameters necessary to open the software and they are 1. Start date of work 2. Sprint length desirable in the project 3. Which percentage of progress will be tested */




class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.chengeSelect = this.chengeSelect.bind(this);
        this.createSelect = this.createSelect.bind(this);
        this.show = this.show.bind(this);
        this.saveData = this.saveData.bind(this);
        this.DeleteAll = this.DeleteAll.bind(this);
        this.DeleteLast = this.DeleteLast.bind(this);
        this.state = {}
    }
    
    /**
     * 
     * @param {Enters the start date of work on the project} date 
     */

    handleChange(date) {
        store.dispatch(startProject(date));
        this.setState({});
    }

    DeleteAll() {
        store.dispatch(DeleteAll())
        this.setState({})
    }
    DeleteLast() {
        store.dispatch(DeleteLast())
        this.setState({})
    }


    // getPercentageStartPoint(i) {
    //     if (i == 0) {
    //         return 5;
    //     } else {
    //         return this.props.dataFromHomePage.resolutionTasks[i - 1] + 5;
    //     }
    // }


    createSelect(startVal) {
        console.log('createSelect() ',startVal);
        
        var arrForSelect = [];
        for (let i = startVal; i <= 100;) {
            arrForSelect.push(i);
            i = i + 5;
        }
        if (startVal > 100){
            return null;
        }
        else{
            return (
                <select onChange={(e) => this.chengeSelect(e)}>
                    {arrForSelect.map((select, index) => <option key={index} value={select}>{select + "%"}</option>)}
                </select>
            )
        };
    }


    chengeSelect(e) {
        console.log("chengeSelect()");
        store.dispatch(saveResulutionFromHomePage(e.target.value))
        this.setState({});
    }


    changeInput(e) {
        store.dispatch(createSprints(e.target.value))
    }
    show(){
        console.log(this.props.saveData);
    }
    
     //   The function that checks if the necessary parameters are entered then the next page will open
    saveData() {
        if (this.props.dataFromHomePage.resolutionTasks.length > 0 && this.props.dataFromHomePage.countSprint != null) {

            store.dispatch(saveData())
        }else{alert("Please fill in the three fields")}
    }


    render() {
        let percentageArray = [...this.props.dataFromHomePage.resolutionTasks];
        var lastSelect = percentageArray[percentageArray.length - 1]
        console.log('Math.max(this.props.dataFromHomePage.resolutionTasks)', Math.max(this.props.dataFromHomePage.resolutionTasks));
        return (
            <div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">choich date for start project</label>
                        <br />
                        <DatePicker
                            selected={this.props.dataFromHomePage.startProject}
                            onSelect={this.handleChange}
                        />
                    </div>
                    <div className="col-3" >
                        <label htmlFor="">choich sprint time in weeks</label>
                        <input type="number" min="1"
                            onChange={this.changeInput} />
                    </div>
                    <div className="col-3" >
                        <label htmlFor="">Choose a task execution resolution
                        </label>
                        <div className="selects">
                            {this.createSelect(Math.max(this.props.dataFromHomePage.resolutionTasks))}
                            <div className="resolutionTasks" style={{"margin": "3px"}}>View the percentage of progress you selected <br />
                            {console.log("from render in HomePage",this.props.dataFromHomePage.resolutionTasks)}
                                {this.props.dataFromHomePage.resolutionTasks.length > 0 ?  this.props.dataFromHomePage.resolutionTasks.map((SelectedNumber, index) =>
                                <div className="SelectedNumber" key={index}>{SelectedNumber}%</div>) : null}
                                <button className="bb" onClick={() => this.DeleteAll}>Delete all</button>
                                <button className="bb" onClick={() => this.DeleteLast}>Delete last</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => this.saveData}>svae Data and go to the planning page</button>
            </div>
        )
    }
}


export default connect(state => state)(HomePage)
