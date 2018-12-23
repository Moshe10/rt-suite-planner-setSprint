import React, { Component } from 'react';
import '../App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../store/store';
import $ from 'jquery';
import axios from 'axios'
import { plusToTaskOnWork } from '../actions/actions';


class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }
    counter = [0,0,0]
    counter = 0;
    sprintNum = this.props.currentSprint;
    // taskOnWork = 0; 

    toggle() {
        this.setState({ display: !this.state.display })
    }

    async updateData(fatherIndex, index){
        const projectId = this.props.projectFromDB._id;
        var task = this.props.projectFromDB.taskContainers[fatherIndex].tasks[index];
        task.sprintNum = this.sprintNum;
        this.props.projectFromDB.taskContainers[fatherIndex].tasks[index] = task;
        store.dispatch(plusToTaskOnWork(fatherIndex, index))
        this.setState({});
        await axios.put('/updateSprintNumInTask', {id:projectId, fatherIndex:fatherIndex, index:index, sprintNum:this.sprintNum});
    }

    hendleTaskClick(index, fatherIndex){
        this.updateData(fatherIndex, index)
    }

    checkIfTaskStarted(container,index){
        console.log('checkIfTaskStarted()');
    
        let counter = 0;
        if (counter <= this.props.taskOnWork[this.props.fatherIndex]) {
                container.tasks.map((task,taskIndex) => {
                    if (task.started) {
                        counter += task.length
                        console.log(task.length);
                        
                    }
                })
        }
        return counter;
    }

    render() {
        return (
            <div>
                <div className="taskContainer">
                    <div className="weeksRect">
                        {this.props.creaetWeekRect}
                    </div>
                    task container name: {this.props.containerName} <br />
                    developer name: ---  , {}
                    {/* CITS = checkIfTaskStarted() */}
                    {this.checkIfTaskStarted(this.props.containerToCITS,this.props.fatherIndex) + this.props.taskOnWork[this.props.fatherIndex]} / {this.props.contLength} work days
                <button className="btn-openTasks"
                    onClick={() => this.toggle()}
                    >
                    Open Tasks
                    </button>
                </div>
                    {this.state.display ? <div className="showTasks">
                    {this.props.tasks.map((item, index) => {
                        if (item.started != true && item.sprintNum == -1) {
                            return(
                                <ListGroupItem
                                    key={index}
                                    color="warning"
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
                        else if (item.started != true && item.sprintNum != -1) {
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
                                    <h4>started</h4>
                                </ListGroupItem>
                            )
                        }
                    })}
                </div> : null}
            </div>
        );
    }
}

export default connect(state => state)(TaskContainer);
