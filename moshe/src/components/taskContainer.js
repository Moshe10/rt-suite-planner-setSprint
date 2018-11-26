import React, { Component } from 'react';
import '../App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import {sendToTodoTasks} from '../actions/actions';
import store from '../store/store';


class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
        // this.sendTaskTotodoTask = this.sendTaskTotodoTask.bind(this)
    }

    toggle() {
        this.setState({ display: !this.state.display })
    }

    sendTaskTotodoTask(item, index){
        store.dispatch(sendToTodoTasks(item, index));
        this.setState({});
    }

    render() {
        return (
            <div>
                <div className="taskContainer">
                    {this.props.mykey}
                    <div className="weeksRect">
                        {this.props.creaetWeekRect}
                    </div>
                    task container name: {this.props.containerName} <br />
                    developer name: ---
                <button className="btn-openTasks"
                        onClick={() => this.toggle()}
                    >Open Tasks</button>
                </div>
                {this.state.display ? <div className="showTasks">
                    {this.props.tasks.map((item, index) => {
                        return (
                            <ListGroup key={index}>
                                <ListGroupItem
                                color="warning"
                                tag="button" 
                                action
                                onClick={()=>this.sendTaskTotodoTask(item, index)}
                                >
                                {item.name},  {}
                                {item.length} Work Days {}
                                {this.props.contIndex}
                                </ListGroupItem>
                            </ListGroup>
                        )
                    })}
                </div> : null}
            </div>
        );
    }
}

export default connect(state => state)(TaskContainer);
