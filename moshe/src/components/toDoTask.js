import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';


class ToDoTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        };
    }

    toggle() {
        this.setState({ display: !this.state.display })
    }

    hendleTaskClick(index, fatherIndex){
        var task = this.props.projectFromDB.taskContainers[fatherIndex].tasks[index]
        task.sprintNum = -1;
        this.props.projectFromDB.taskContainers[fatherIndex].tasks[index] = task;
        this.setState({})
    }

    render() {
    return (
        <div>
        <div className="taskContainer">
            <div className="weeksRect">
                {this.props.creaetWeekRect}
            </div>
            task container name: {this.props.containerName} <br />
            developer name: ---
        <button className="btn-openTasks"
            onClick={() => this.toggle()}
            >
            Open Tasks
            </button>
        </div>
            {this.state.display ? <div className="showTasks">
            {this.props.tasks.map((item, index) => {
                if (item.started != true && item.sprintNum == 2) {
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
                            {this.props.contIndex}
                        </ListGroupItem>
                    )
                }
                else if (item.started != true && item.sprintNum != 2) {
                    return(
                        <ListGroupItem
                            key={index}
                            color="danger"
                        >
                            {item.name},  {}
                            {item.length} Work Days {}
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