import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, BrowserRouter, Route } from 'react-router-dom';
import PlanningBoard from './PlanningBoard';
import SetSprint from '../setSprint';
import store from '../../store/store';
import { setWeeksOfProject } from '../../actions/actions';
import axios from "axios";
import { updateWeekInTaskContainer } from '../../actions/actions'
import StartDate from '../StartDate'


class DisplayScreenSprint extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            locked: true,
            maxCellsPerScreen:10
        }

    }
    // projectId = this.props.projectFromDB._id;


    componentWillMount() {
        this.calculateTheProLength(this.props.projectFromDB.name, this.props.projectFromDB.taskContainers);
    }

    calculateTheProLength(projectName, taskContainers) {
        let proLength = 0;
        let name = projectName;
        for (let i = 0; i < taskContainers.length; i++) {
            for (let z = 0; z < taskContainers[i].tasks.length; z++) {
                proLength += taskContainers[i].tasks[z].length;
            }
        }
        let weeksOfPro = Math.ceil(proLength / 5);
        store.dispatch(setWeeksOfProject(name, weeksOfPro))
    }

    async hendleChangeWeekHandler(index, week) {
        const projectId = this.props.projectFromDB._id;
        // setTimeout(300,alert('this task container get week number ' + week)) ;
        store.dispatch(updateWeekInTaskContainer(index, week));
        await axios.put('/updateWeekOfTaskContainer', { id: projectId, contIndex: index, contWeek: week });
    }

    Toggle = () => {
        if (this.props.toggleSetSprint) {
            let sentData = Object.assign({}, {
                weeks: StartDate.createWeeks(this.props.projectLength.length, new Date(this.props.projectFromDB.startDate)),
                containers: this.props.projectFromDB.taskContainers.map((container) => {
                    return {
                        contName: container.name, week: container.week, developers: container.developers, tasks: container.tasks.map((task) => {
                            return { taskLength: task.length, status: task.status }
                        })
                    }
                }),
                projectLength: this.props.projectLength.length
            });
            return (
                <PlanningBoard
                    cellHeight={100}
                    cellWidth={100}
                    firstCellWidth={300}
                    changeWeekHandler={this.hendleChangeWeekHandler.bind(this)}
                    offset={this.state.offset * this.props.projectFromDB.sprintLength}
                    data={sentData}
                    unlock={!this.state.locked}
                    maxCellsPerScreen={this.state.maxCellsPerScreen}
                />
            )
        }
        else {
            return (
                <SetSprint />
            )
        }
    }

    render() {

        return (

            <BrowserRouter>
                <div className="mainDiv">
                    <Link to="/"></Link>

                    <Route exact path='/' component={this.Toggle} />
                    <button onClick={e => { this.setState({ offset: Math.min(this.state.offset + 1, Math.ceil((this.props.projectLength.length - this.state.maxCellsPerScreen) / this.props.projectFromDB.sprintLength)) }) }}>+</button>
                    <button onClick={e => { this.setState({ offset: Math.max(this.state.offset - 1, 0) }) }}>-</button>
                    <button onClick={e => {this.setState({locked:!this.state.locked})}}>{this.state.locked?'locked':'unlocked'}</button>
                </div>
            </BrowserRouter>
        )
    }
}
export default connect(stata => stata)(DisplayScreenSprint)