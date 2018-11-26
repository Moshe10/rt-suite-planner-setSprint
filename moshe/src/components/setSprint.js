import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../store/store';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskContainer from './taskContainer';
import ToDoTask from './toDoTask';
import { ListGroup, ListGroupItem } from 'reactstrap';


class SetSprint extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // מחשבן את אורך המשימה לפי כל זמני התת משימות וזה מתעגל כלפי מעלה
    calculateLengthCont(item) {
        let contLength = 0;
        for (let i = 0; i < item.tasks.length; i++) {
            contLength += item.tasks[i].length;
        }
        return (Math.ceil(contLength / 5));
    }

    creaetWeekRect = (contLength) => {
        const sprintLength = 2;
        var divArr = [];
        for (let i = 0; i < contLength; i++) {
            if (i <= (sprintLength - 1)) {
                let div = <div key={i} className="weekRectBlack"></div>
                divArr.push(div)
            }
            else {
                let div = <div key={i} className="weekRectWhite"></div>
                divArr.push(div)
            }
        }
        return divArr;
    }

    generateButtonID(index) {
        return 'btnOpenTasks' + index
    }

    buildingTasks = () => {
        return (
            <div>
                {this.props.project1.containers.map((item, index) => {

                    let contLength = this.calculateLengthCont(item);
                    return (
                        <TaskContainer
                            key={index}
                            creaetWeekRect={this.creaetWeekRect(contLength)}
                            containerName={item.name}
                            tasks={item.tasks}
                            contIndex={index}
                        />
                    )
                })}
            </div>
        )
    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-5">
                        <div className="myborder">
                            <h1>Sprint ---</h1>
                            {this.buildingTasks()}
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="myborder">
                            
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(state => state)(SetSprint);

