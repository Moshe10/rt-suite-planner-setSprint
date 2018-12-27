import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import store from '../store/store';
import { minusToTaskOnWork } from '../actions/actions';


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

    async hendleTaskClick(index, fatherIndex){
        const projectId = this.props.projectFromDB._id;
        var task = this.props.projectFromDB.taskContainers[fatherIndex].tasks[index];
        task.sprintNum = -1;
        this.props.projectFromDB.taskContainers[fatherIndex].tasks[index] = task;
        store.dispatch(minusToTaskOnWork(fatherIndex, index))
        this.setState({});
        await axios.put('/updateSprintNumInTask', {id:projectId, fatherIndex:fatherIndex, index:index, sprintNum:-1})
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
                            onClick={() => this.hendleTaskClick(index, this.props.fatherIndex)}
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