import React, { Component } from 'react';
import store from '../store/store';
import { connect } from "react-redux";
import { saveData, startProject, createProject, savePercentage, createSprints, saveResulutionFromHomePage, DeleteAll, DeleteLast, setWeeksOfProject } from '../actions/actions'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-picky/dist/picky.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import jquery from 'jquery';
/**Here the project manager will enter the parameters necessary to open the software and they are 1. Start date of work 2. Sprint length desirable in the project 3. Which percentage of progress will be tested */




class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleChangeOfDatePicker = this.handleChangeOfDatePicker.bind(this);
        this.chengeSelect = this.chengeSelect.bind(this);
        this.createSelect = this.createSelect.bind(this);
        this.saveData = this.saveData.bind(this);
        this.DeleteAll = this.DeleteAll.bind(this);
        this.DeleteLast = this.DeleteLast.bind(this);
        this.state = {}
    }
    
    // /**
    //  * 
    //  * @param {Enters the start date of work on the project} date 
    //  */

    componentWillMount(){
        // this.calculateTheProLength(this.props.project1.name, this.props.project1.containers );

    }
    
    async myCreateProject(){
        console.log('createProject');
        await axios.post('http://10.2.2.108:3000/createProject', this.props.project1)
        .then((req, res) => {
        })
        await axios.get('/getAllProject').
        then((res) => {
            if (res.data.length == 1) {
                let myProject = res.data[0];
                store.dispatch(createProject(myProject));
            }
        })
    }

    // calculateTheProLength(projectName, taskContainers){
    //     let proLength = 0;
    //     let name = projectName;
    //     for (let i = 0; i < taskContainers.length; i++) {
    //         for (let z = 0; z < taskContainers[i].tasks.length; z++) {
    //             proLength += taskContainers[i].tasks[z].length;
    //         }
    //     }
    //     let weeksOfPro = Math.ceil(proLength / 5)
    //     store.dispatch(setWeeksOfProject(name, weeksOfPro ))
    // }

    handleChangeOfDatePicker(date) {
        store.dispatch(startProject(date));
        this.setState({});
    }

    DeleteAll() {
        store.dispatch(DeleteAll())
        this.setState({})
    }

    DeleteLast() {
        store.dispatch(DeleteLast())
        this.setState({})
    }

    createSelect(startVal) {
        var arrForSelect = [];
        for (let i = startVal; i <= 100;) {
            arrForSelect.push(i);
            i = i + 5;
        }
        if (startVal > 100){
            return null;
        }
        else{
            return (
                <select onChange={(e) => this.chengeSelect(e)}>
                    {arrForSelect.map((select, index) => <option key={index} value={select}>{select + "%"}</option>)}
                </select>
            )
        };
    }

    chengeSelect(e) {
        store.dispatch(saveResulutionFromHomePage(e.target.value))
        this.setState({});
    }

    changeInputToSprint(e) {
        store.dispatch(createSprints(e.target.value))
    }
    
     //   The function that checks if the necessary parameters are entered then the next page will open
    saveData() {
        if (!jquery.isEmptyObject(this.props.projectFromDB)) {
            if (this.props.projectFromDB.resolution.length > 0 && this.props.projectFromDB.sprintLength != null) {
                store.dispatch(saveData())
            }
        }
        else{
            alert("Please fill in the three fields")
        }
    }


    render() {
        // let percentageArray = [...this.props.dataFromHomePage.resolutionTasks];
        // var lastSelect = percentageArray[percentageArray.length - 1]
        let resolutionArrFromstore = this.props.projectFromDB.resolution;
        
        return (
            <div>
                <button onClick={() => this.myCreateProject()}>Create Project</button>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">choich date for start project</label>
                        <br />
                        <DatePicker
                            selected={this.props.dataFromHomePage.startProject}
                            onSelect={this.handleChangeOfDatePicker}
                        />
                    </div>
                    <div className="col-3" >
                        <label htmlFor="">choich sprint time in weeks</label>
                        <input type="number" min="1"
                         onChange={(e) => this.changeInputToSprint(e)} />
                    </div>
                    <div className="col-3" >
                        <label htmlFor="">Choose a task execution resolution
                        </label>
                        <div className="selects">
                            {!jquery.isEmptyObject(this.props.projectFromDB) ? this.createSelect(Math.max(...resolutionArrFromstore) + 5) : null}
                            {!jquery.isEmptyObject(this.props.projectFromDB) ? 
                            <div className="resolutionTasks" style={{"margin": "3px"}}>
                                View the percentage of progress you selected <br />
                                {this.props.projectFromDB.resolution.length > 0 ?  this.props.projectFromDB.resolution.map((SelectedNumber, index) =>
                                <div className="SelectedNumber" key={index}>{SelectedNumber}%</div>) : null}
                                <button className="bb" onClick={() => this.DeleteAll()}>Delete all</button>
                                <button className="bb" onClick={() => this.DeleteLast()}>Delete last</button>
                            </div> : <h2>waiting to press on createProject...</h2>}
                        </div>
                    </div>
                </div>
                <button onClick={() => this.saveData()}>svae Data and go to the planning page</button>
            </div>
        )
    }
}


export default connect(state => state)(HomePage)
