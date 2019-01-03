import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import store from '../store/store';
import { minusToTaskOnWork, updateSprintNumInTask } from '../actions/actions';


class ToDoTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        };
    }
    sprintNum = this.props.currentSprint;

    toggle() {
        this.setState({ display: !this.state.display })
    }

    async hendleTaskClick(fatherIndex, taskIndex){
        // var task = this.props.projectFromDB.taskContainers[fatherIndex].tasks[index];
        // task.sprintNum = -1;
        // this.props.projectFromDB.taskContainers[fatherIndex].tasks[index] = task;
        const num = -1;
        store.dispatch(updateSprintNumInTask(fatherIndex, taskIndex, num));
        store.dispatch(minusToTaskOnWork(fatherIndex, taskIndex))
        this.setState({});
        const projectId = this.props.projectFromDB._id;
        await axios.put('/updateSprintNumInTask', {id:projectId, fatherIndex:fatherIndex, taskIndex:taskIndex, sprintNum:-1})
    }

    render() {
    return (
        <div>
        <div className="taskContainer">
            <div className="weeksRect">
                {this.props.creaetWeekRect}
            </div>
            task container name: {this.props.containerName} <br />
            developer name: {this.props.developers}
        <button className="btn-openTasks"
            onClick={() => this.toggle()}
            >
            Open Tasks
            </button>
        </div>
            {this.state.display ? <div className="showTasks">
            {this.props.tasks.map((item, index) => {
                if (item.started != true && item.sprintNum == this.sprintNum) {
                    return(
                        <ListGroupItem
                            key={index}
                            color="success"
                            tag="button" 
                            action
                            onClick={() => this.hendleTaskClick(this.props.fatherIndex, index)}
                        >
                            {item.name},  {}
                            {item.length} Work Days {}
                            , sprint num: {item.sprintNum}
                        </ListGroupItem>
                    )
                }
                else if (item.started != true && item.sprintNum != this.sprintNum) {
                    return(
                        <ListGroupItem
                            key={index}
                            color="danger"
                        >
                            {item.name},  {}
                            {item.length} Work Days {}
                            , sprint num: {item.sprintNum}
                        </ListGroupItem>
                    )
                }
                else if (item.started == true) {
                    return(
                        <ListGroupItem
                            key={index}
                            color="danger"
                        >
                            {item.name},  {}
                            {item.length} Work Days {}
                            , sprint num: {item.sprintNum}
                            <h3>started</h3>
                        </ListGroupItem>
                    )
                }
            })}
        </div> : null}
        </div>
    );
  }
}

export default connect(state => state)(ToDoTask);