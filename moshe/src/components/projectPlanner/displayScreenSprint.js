import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, BrowserRouter, Route } from 'react-router-dom';
import PlanningBoard from './PlanningBoard';
import SetSprint from '../setSprint';
import store from '../../store/store';
import { setWeeksOfProject } from '../../actions/actions';


class DisplayScreenSprint extends Component {
    constructor(){
        super()
       
    }

    componentWillMount(){
        this.calculateTheProLength(this.props.projectFromDB.name, this.props.projectFromDB.taskContainers );

    }

    calculateTheProLength(projectName, taskContainers){
        let proLength = 0;
        let name = projectName;
        for (let i = 0; i < taskContainers.length; i++) {
            for (let z = 0; z < taskContainers[i].tasks.length; z++) {
                proLength += taskContainers[i].tasks[z].length;
            }
        }
        let weeksOfPro = Math.ceil(proLength / 5)
        store.dispatch(setWeeksOfProject(name, weeksOfPro ))
    }

    hendleChangeWeekHandler(index, week){
        console.log(index,week);
    }

    Toggle = () => {
        if (this.props.toggleSetSprint) {
            return (
                <PlanningBoard
                cellHeight = {100}
                cellWidth = {100}
                firstCellWidth = {300}
                changeWeekHandler = {this.hendleChangeWeekHandler}
                offset = {0}
                data = {{containers:this.props.projectFromDB.taskContainers.map((container) => {
                        return {contName:container.name,week:0,tasks:container.tasks.map((task) => {
                        return {taskLength:task.length, status:'null'}})}}),
                        projectLength:this.props.projectLength.length}}
                />
            )
        }
        else {
            return (
              <SetSprint/>
            )
        }
    }

    render() {
        return (
        
                <BrowserRouter>
                    <div className="mainDiv">
                        <Link to="/"></Link>

                        <Route exact path='/' component={this.Toggle} />
                    </div>
                </BrowserRouter>
        )
    }
}
export default connect(stata => stata)(DisplayScreenSprint)