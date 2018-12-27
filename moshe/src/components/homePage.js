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
import { FormGroup, Input } from 'reactstrap';
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
        this.hendleChangeProjectName = this.hendleChangeProjectName.bind(this);
        this.state = {
            projectName: '',
        }
    }

    componentWillMount() {

    }

    async myCreateProject() {
        console.log('createProject');
        let proName = this.state.projectName;
        console.log(proName);
        await axios.post('http://10.2.2.109:3000/createProject', { projectName: proName, project: this.props.project })
            .then((req, res) => {
            })
        await axios.get('/getAllProject').
            then((res) => {
                // if (res.data.length == 1) {
                let myProject = res.data[0];
                store.dispatch(createProject(myProject));
                // }
            })
    }

    hendleChangeProjectName(e) {
        let proName = e.target.value;
        this.setState({ projectName: proName })



    }

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
        //arrForSelect.push(<option style={{color:"blue"}}>select number</option>)

        for (let i = startVal; i <= 100;) {
            arrForSelect.push(i);
            i = i + 5;
        }
        if (startVal > 100) {
            return null;
        }
        else {
            return (
                // <select onChange={(e) => this.chengeSelect(e)}>
                //     {arrForSelect.map((select, index) => <option key={index} value={select}>{select + "%"}</option>)}
                // </select>
                <FormGroup>
                    <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        onChange={(e) => this.chengeSelect(e)}
                    >
                        {arrForSelect.map((number, index) => <option key={index} value={number}>{number + "%"}</option>)}
                    </Input>
                </FormGroup>
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
            if (this.props.projectFromDB.resolution.length > 0 && this.props.projectFromDB.sprintLength != null && this.props.projectFromDB.startDate != null) {
                axios.put('/updateResolution&date&SprintLength', {
                    project_id: this.props.projectFromDB._id,
                    resolution: this.props.projectFromDB.resolution,
                    sprintLength: this.props.projectFromDB.sprintLength,
                    startDate: this.props.projectFromDB.startDate,
                })
                //.then((req, res) => {})
                store.dispatch(saveData());
            }
        }
        else {
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
                <input onChange={this.hendleChangeProjectName} placeholder="insert project name" type="text" />

                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">choose date for start project</label>
                        <br />
                        <DatePicker
                            selected={this.props.projectFromDB.startDate}
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
                                <div className="resolutionTasks" style={{ "margin": "3px" }}>
                                    View the percentage of progress you selected <br />
                                    {this.props.projectFromDB.resolution.length > 0 ? this.props.projectFromDB.resolution.map((SelectedNumber, index) =>
                                        <div className="SelectedNumber" key={index}>{SelectedNumber}%</div>) : null}
                                    <button className="bb" onClick={() => this.DeleteAll()}>Delete all</button>
                                    <button className="bb" onClick={() => this.DeleteLast()}>Delete last</button>
                                </div> : <h2>waiting to press on createProject...</h2>}
                        </div>
                    </div>
                </div>
                <button onClick={() => this.saveData()}>save Data and go to the planning page</button>
            </div>
        )


    }
}


export default connect(state => state)(HomePage)
