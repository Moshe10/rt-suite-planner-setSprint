import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../store/store';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskContainer from './taskContainer';
import ToDoTask from './toDoTask';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Badge } from 'reactstrap';
import { createProject, updateToggleSetSprinToTrue } from '../actions/actions';
import jquery from 'jquery';



class SetSprint extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        
    }

    // async createProject(){
    //     console.log('createProject');
    //     await axios.post('http://10.2.2.108:3000/createProject', this.props.project1)
    //     .then((req, res) => {
    //     })
    //     await axios.get('/getAllProject').
    //     then((res) => {
    //         if (res.data.length == 1) {
    //             let myProject = res.data[0];
    //             store.dispatch(createProject(myProject));
    //         }
    //     })
    // }

    updateOfterLockSprint(projecrId, taskContainers){
        axios.put('/lockSprint', {projectId:projecrId, taskContainers:taskContainers})
    }

    async hendleLockSprint(){
        let projecrId = this.props.projectFromDB._id;
        this.props.projectFromDB.taskContainers.map( async (container, contIndex) => {
            container.tasks.map( async (task, taskIndex) => {
                if(task.sprintNum == 2){
                    task.started = true;
                }
            })
        })
        console.log(this.props.projectFromDB.taskContainers);
        await this.updateOfterLockSprint(projecrId, this.props.projectFromDB.taskContainers)
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
        const sprintLength = this.props.project1.sprintLength;
        const indexInSprint = 1;
        let weeksOfSprintArr = [];
        let weeksOfProjectArr = [];
        for (let i = 0; i < contLength; i++) {
            let div = <div key={i} className="weekRectWhite"></div>
            weeksOfProjectArr.push(div)
        }
        for (let i = 0; i < sprintLength; i++) {
            let div = <div key={i} className="weekRectBlack"></div>
            weeksOfSprintArr.push(div)
        }

        weeksOfProjectArr.splice(indexInSprint,sprintLength,weeksOfSprintArr)
        return weeksOfProjectArr;
    }

    heandleBackToPlannigBordOC(){
        store.dispatch(updateToggleSetSprinToTrue())
    }

    buildingBankTasks = () => {
        if (!jquery.isEmptyObject(this.props.projectFromDB)) {
            return (
                <div>
                    {this.props.projectFromDB.taskContainers.map((item, index) => {
                        let contLength = this.calculateLengthCont(item);
                        return (
                            <ListGroup key={index}>
                                <TaskContainer
                                    key={index}
                                    creaetWeekRect={this.creaetWeekRect(contLength)}
                                    containerName={item.name}
                                    tasks={item.tasks}
                                    fatherIndex={index}
                                />
                            </ListGroup>
                            
                        )
                    })}
                </div>
            )
        }
    }

    buildingTodoTasks = () => {
        if (!jquery.isEmptyObject(this.props.projectFromDB)){
            return (
                <div>
                    {this.props.projectFromDB.taskContainers.map((item, index) => {
                        let contLength = this.calculateLengthCont(item);
                        return (
                            <ListGroup key={index}>
                                <ToDoTask
                                    key={index}
                                    creaetWeekRect={this.creaetWeekRect(contLength)}
                                    containerName={item.name}
                                    tasks={item.tasks}
                                    fatherIndex={index}
                                />
                            </ListGroup>
                        )
                    })}
                </div>
            )
        }
    }

    render() {

        return (
            <div>
                {/* <button onClick={() => this.createProject()}>Create Project</button>{' '} */}
                <button onClick={() => this.heandleBackToPlannigBordOC()}>Back to Plannig Bord</button>
                <div className="row">
                    <div className="col-5">
                        <div className="myborder">
                            <h1>Sprint <Badge color="warning" pill>{this.props.currentSprint}</Badge></h1>
                            {this.buildingBankTasks()}
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="myborder">
                            <h1>Sprint <Badge color="warning" pill>{this.props.currentSprint}</Badge></h1>
                            {this.buildingTodoTasks()}
                        </div>
                    </div>
                </div>
                    <Button className="btn-lockSprint" color="info" onClick={() => this.hendleLockSprint()}>Lock Sprint </Button>
            </div>
        )
    }
}

export default connect(state => state)(SetSprint);

