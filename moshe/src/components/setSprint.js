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
import { fillTaskOnWorkArr, updateToggleSetSprinToTrue } from '../actions/actions';
import jquery from 'jquery';



class SetSprint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // contWeek:null
        };
        this.creaetWeekRect = this.creaetWeekRect.bind(this)
    }
    currentSprint = this.props.currentSprint
    currentContLength = 0;
    contWeek = null;
    updateOfterLockSprint(projecrId, taskContainers){
        axios.put('/lockSprint', {projectId:projecrId, taskContainers:taskContainers});
    }

    async hendleLockSprint(){
        let projecrId = this.props.projectFromDB._id;
        this.props.projectFromDB.taskContainers.map( async (container, contIndex) => {
            container.tasks.map( async (task, taskIndex) => {
                if(task.sprintNum == this.props.currentSprint){
                    task.started = true;
                    task.status = 'working';
                }
            })
        })
        console.log(this.props.projectFromDB.taskContainers);
        await this.updateOfterLockSprint(projecrId, this.props.projectFromDB.taskContainers);
    }

    // מחשבן את אורך המשימה לפי כל זמני התת משימות וזה מתעגל כלפי מעלה
    calculateLengthCont(item) {
        let contLength = 0;
        for (let i = 0; i < item.tasks.length; i++) {
            contLength += item.tasks[i].length;
        }
        this.currentContLength = contLength;
        return (Math.ceil(contLength / 5));
    }

    creaetWeekRect = (contLength,name) => {
        const sprintLength = this.props.projectFromDB.sprintLength;
        let weeksOfSprintArr = [];
        let weeksOfProjectArr = [];
        
        for (let i = this.contWeek; i < (this.contWeek + contLength); i++) {
            let whitediv = <div key={i} className="weekRectWhite"></div>
            let blackdiv = <div key={i} className="weekRectBlack"></div>
            // console.log(name,this.currentSprint,'-----------------------------------------------------');
            // console.log('i',i);
            // console.log('sprint num: ', parseInt(i / sprintLength));
            // console.log('-----------------------------------------------------');
            if(this.currentSprint == parseInt(i / sprintLength)){
                weeksOfProjectArr.push(blackdiv)
            }
            else weeksOfProjectArr.push(whitediv)
        }
        // console.log('weeksOfProjectArr.length',weeksOfProjectArr.length);
        // console.log('contLength',contLength);
        // console.log('sprintLength',sprintLength);
        // for (let i = 0; i < sprintLength; i++) {
        //     let blackdiv = <div key={i} className="weekRectBlack"></div>
        //         weeksOfSprintArr.push(blackdiv)
        // }
        // weeksOfProjectArr.splice(indexInSprint,sprintLength,weeksOfSprintArr)
        return weeksOfProjectArr;
    }

    heandleBackToPlannigBordOC(){
        store.dispatch(updateToggleSetSprinToTrue());
    }

    // filltaskOnWork = () => {
    //     let tempArr = [];
    //     let tempNum = 0;
    //     if(!jquery.isEmptyObject(this.props.projectFromDB) && tempNum == 0){
    //         this.props.projectFromDB.taskContainers.map((cont, index) => {
    //             tempArr.push(0)
    //         })
    //         tempNum ++;
    //         store.dispatch(fillTaskOnWorkArr(tempArr))
    //     }
    // }

    buildingBankTasks = () => {
        if (!jquery.isEmptyObject(this.props.projectFromDB)) {
            return (
                <div>
                    {this.props.projectFromDB.taskContainers.map((item, index) => {
                        let contLength = this.calculateLengthCont(item);
                        this.contWeek = item.week;
                        return (
                            <ListGroup key={index}>
                                <TaskContainer
                                    key={index}
                                    creaetWeekRect={this.creaetWeekRect(contLength,item.name)}
                                    containerName={item.name}
                                    contLength={this.currentContLength}
                                    tasks={item.tasks}
                                    fatherIndex={index}
                                    // indexTaskOnWork={index}
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
                <button onClick={() => this.heandleBackToPlannigBordOC()}>Back to Plannig Bord</button>
                <div className="row">
                    <div className="col-5">
                        <div className="myborder">
                            <h1>Bank Task, Sprint <Badge color="warning" pill>{this.props.currentSprint}</Badge></h1>
                            {this.buildingBankTasks()}
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="myborder">
                            <h1>ToDo Task, Sprint <Badge color="warning" pill>{this.props.currentSprint}</Badge></h1>
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

