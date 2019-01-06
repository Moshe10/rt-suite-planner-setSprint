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
import { FormGroup, Input, Label } from 'reactstrap';
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
        this.hendleGetProject = this.hendleGetProject.bind(this);
        this.hendleSelectTemlate = this.hendleSelectTemlate.bind(this);
        this.state = {
            projectName: '',
            nameToGetProject: '',
            templates: [],
            templateForProject: '',
        }
    }

    async componentWillMount() {
        await axios.get('http://10.2.3.130:5555/templates')
        .then((response) => {
            this.setState({templates:response.data})
          })
          .catch(err => {
            console.log("err", err.message);
          })
    }

    async myCreateProject() {
        if (this.state.projectName !== '') {
            console.log('createProject');
            let proName = this.state.projectName;
            console.log(proName);
            await axios.post('http://10.2.3.131:3000/createProject', { projectName: proName, project: this.props.project })
                .then((req, res) => {
                })
                await axios.get('/getAllProject/'+ proName).
                then((res) => {
                    // if (res.data.length == 1) {
                    let myProject = res.data[0];
                    store.dispatch(createProject(myProject));
                    // }
                })
        }
    }
    
    async hendleGetProjectOnClick(){
        if (this.state.nameToGetProject !== '') {
            let proName = this.state.nameToGetProject;
            await axios.get('http://10.2.3.131:3000/GetBringAnExistingProject/' + proName)
                    .then((res) => {
                        let pro = res.data[0]
                        console.log(pro);
                        if (pro.startDate !== null && pro.resolution.length > 2 && pro.sprintLength !== null) {
                            console.log('all detals full, going to plannig');
                            store.dispatch(createProject(pro));
                            store.dispatch(saveData());
                            
                        }
                        else alert('Missing details needed to plan the project')
                        
                    })
        }
    }

    hendleChangeProjectName(e) {
        let proName = e.target.value;
        this.setState({ projectName: proName })
    }

    hendleGetProject(e){
        let proName = e.target.value;
        this.setState({nameToGetProject:proName})
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
                        {arrForSelect.map((number, index) => {
                            return(
                                <option key={index} value={number}>{number + '%'}</option>)}
                            )} 
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
    async saveData() {
        if (!jquery.isEmptyObject(this.props.projectFromDB)) {
            if (this.props.projectFromDB.resolution.length > 0 && this.props.projectFromDB.sprintLength != null && this.props.projectFromDB.startDate != null) {
                await axios.put('/updateResolution&date&SprintLength', {
                    project_id: this.props.projectFromDB._id,
                    resolution: this.props.projectFromDB.resolution,
                    sprintLength: this.props.projectFromDB.sprintLength,
                    startDate: this.props.projectFromDB.startDate,
                })
                //.then((req, res) => {})
                store.dispatch(saveData());
                let dataForTrello = {
                    projectName:this.props.projectFromDB.name,
                    resolution: this.props.projectFromDB.resolution,
                    template: this.state.templateForProject,
                }
                await axios.post('http://10.2.3.130:5555/new_project', dataForTrello)
                .then((req, res) => {
                    console.log(req);
                })
            }
        }
        else {
            alert("Please fill in the three fields")
        }
    }

    fillTheTemplateSelect(){
        let tempArr = [];
        this.state.templates.map((temp, index) => {
            tempArr.push(<option key={index}>{temp}</option>)
        });
        return tempArr;
    }

    hendleSelectTemlate(e){
        let template = e.target.value;
        this.setState({templateForProject:template})
    }

    render() {

        let resolutionArrFromstore = this.props.projectFromDB.resolution;

        return (
            <div>

                To create a new Project, ---> Project Name: <input onChange={this.hendleChangeProjectName} placeholder="insert project name..." type="text" />
                <button onClick={() => this.myCreateProject()}>Create Project</button><br/>
                Option to select a projet: <br/> 1) If you know the Project name insert to the input --->
                <input placeholder="insert project name..." onChange={(e) => this.hendleGetProject(e)} type="text"/>
                <button onClick={() => this.hendleGetProjectOnClick()} >Get Project</button><br/>
                <hr/><hr/>
                <h2>details to new project</h2>
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
                            {!jquery.isEmptyObject(this.props.projectFromDB) ? this.createSelect(0/*Math.max(...resolutionArrFromstore) + 5*/) : null}
                            {!jquery.isEmptyObject(this.props.projectFromDB) ?
                                <div className="resolutionTasks" style={{ "margin": "3px" }}>
                                    View the percentage of progress you selected <br />
                                    {this.props.projectFromDB.resolution.length > 0 ? this.props.projectFromDB.resolution.map((SelectedNumber, index) =>
                                        <div className="SelectedNumber" key={index}>{SelectedNumber+'%'}</div>) : null}
                                    <button className="bb" onClick={() => this.DeleteAll()}>Delete all</button>
                                    <button className="bb" onClick={() => this.DeleteLast()}>Delete last</button>
                                </div> : <h2>waiting to press on createProject...</h2>}
                        </div>
                    </div>
                    <div className="col-3" >
                    <FormGroup>
                        <Label for="exampleSelect">templates</Label>
                        <Input onChange={(e) => this.hendleSelectTemlate(e)} type="select" name="select" id="exampleSelect">
                            {this.fillTheTemplateSelect()}
                        </Input>
                        </FormGroup>
                    </div>
                </div>
                <button onClick={() => this.saveData()}>save Data and go to the planning page</button>
            </div>
        )


    }
}


export default connect(state => state)(HomePage)
