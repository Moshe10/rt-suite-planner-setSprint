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
import { fillTaskOnWorkArr, updateToggleSetSprinToTrue, lockSprint, fillZerosIntaskOnWorkArrInStore } from '../actions/actions';
import jquery from 'jquery';



class SetSprint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.creaetWeekRect = this.creaetWeekRect.bind(this)
    }
    sprintLength = this.props.projectFromDB.sprintLength
    currentSprint = this.props.currentSprint
    currentContLength = 0;
    contWeek = null;

    componentDidMount(){
        store.dispatch(fillZerosIntaskOnWorkArrInStore(this.fillTheTaskOnWorkArrInStore()))
    }

    fillTheTaskOnWorkArrInStore ()  {
            let zeroArr = [];
            this.props.projectFromDB.taskContainers.map((cont) => {
                zeroArr.push(0);
            })
            return zeroArr;
    }

    updateOfterLockSprint(projecrId, taskContainers){
        axios.put('/lockSprint', {projectId:projecrId, taskContainers:taskContainers});
    }

    async hendleLockSprint(){
        let projecrId = this.props.projectFromDB._id;
        this.props.projectFromDB.taskContainers.map( async (container, contIndex) => {
            container.tasks.map( async (task, taskIndex) => {
                if(task.sprintNum == this.props.currentSprint){
                    store.dispatch(lockSprint(contIndex,taskIndex))
                }
            })
        })
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
        let weeksOfProjectArr = [];
        
        for (let i = this.contWeek; i < (this.contWeek + contLength); i++) {
            
            let whiteDiv = <div key={i} className="weekRectWhite"></div>
            let blackDiv = <div key={i} className="weekRectBlack"></div>

            if(this.currentSprint == parseInt(i / this.sprintLength) && this.contWeek != -1){
                weeksOfProjectArr.push(blackDiv)
            }
            else weeksOfProjectArr.push(whiteDiv)
        }
        return weeksOfProjectArr;
    }

    heandleBackToPlannigBordOC(){
        store.dispatch(updateToggleSetSprinToTrue());
    }

    checkIfContHaveDev(cont){
        if (cont.developers.length > 0){
            return cont.developers[0].name
        }
        else{
            return 'no developers'
        } 
    }

    buildingBankTasks = () => {
        if (!jquery.isEmptyObject(this.props.projectFromDB)) {
            return (
                <div>
                    {this.props.projectFromDB.taskContainers.map((item, index) => {
                        let contLength = this.calculateLengthCont(item);
                        this.contWeek = item.week;
                        
                        for (let i = this.contWeek; i < (this.contWeek + contLength); i++) {
                            if (this.currentSprint == parseInt(i / this.sprintLength) && this.contWeek != -1) {
                                    return (
                                        <ListGroup key={index}>
                                            <TaskContainer
                                                key={index}
                                                creaetWeekRect={this.creaetWeekRect(contLength,item.name)}
                                                containerName={item.name}
                                                contLength={this.currentContLength}
                                                tasks={item.tasks}
                                                fatherIndex={index}
                                                developers={this.checkIfContHaveDev(item)}
                                                // developers={item.developers[0]}
                                            />
                                        </ListGroup>
                                    )
                            }
                        }
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
                        this.contWeek = item.week;

                        for (let i = this.contWeek; i < (this.contWeek + contLength); i++) {
                            if (this.currentSprint == parseInt(i / this.sprintLength) && this.contWeek != -1) {
                                return (
                                    <ListGroup key={index}>
                                        <ToDoTask
                                            key={index}
                                            creaetWeekRect={this.creaetWeekRect(contLength)}
                                            containerName={item.name}
                                            tasks={item.tasks}
                                            fatherIndex={index}
                                            developers={this.checkIfContHaveDev(item)}
                                            // developers={item.developers[0]}
                                        />
                                    </ListGroup>
                                )
                            }
                        }
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

