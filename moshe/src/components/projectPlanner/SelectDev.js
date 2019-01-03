import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import {  AvField,  AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import axios from 'axios';
import '../../App.css'
import store from '../../store/store';
import { selectDevToCont } from '../../actions/actions';



class SelectDev extends Component {

    constructor(props) {
        super(props);
        this.checked = this.checked.bind(this);
        this.state = {
          developers:[],
          Pressed:[false,false,false,false,false,false,false],
        //   Pressed:[],
        };
    }
    projectId = this.props.projectFromDB._id;
    
    async componentWillMount() {
        let allDevForCont = [];
        let devArr = [];
        await axios.get('http://5c237c1a5db0f6001345ff30.mockapi.io/developers')
        .then((response) => {
            // this.setState({developers:response.data})
            devArr = response.data;
          })
          .catch(err => {
            console.log("err", err.message);
          })
          this.props.projectFromDB.taskContainers.map((cont,index) => {
              allDevForCont[index] = devArr;
          })
          console.log(allDevForCont);
          this.setState({developers:allDevForCont});
          this.setState({Pressed:this.fillThePressedinState()});
    }

    fillThePressedinState(){
        let falseArr = [];
        this.props.projectFromDB.taskContainers.map((cont,index) => {
            falseArr.push(false);
        })
        console.log(falseArr);
        
        return falseArr;
    }


    async checked(e,index,contIndex,dev){
        console.log(e.target.checked, index);
        console.log(dev);
        let id = this.projectId;
        let bool = e.target.checked; 
        store.dispatch(selectDevToCont(dev, contIndex, bool));
        await axios.put('/updateDevForCont', {proId:id,developer:dev,index:contIndex,bool:bool})
    }
    
    fillDevSelect(contIndex) {
        let arr = [];
        this.state.developers[contIndex].map((dev, index) => {

            arr.push(<label>
                    <input type="checkbox" checked={dev.busy} onChange={(e) => this.checked(e,index,contIndex,dev)} id={"one"+index} />{dev.name}
                    </label>)
        })
        return arr
    }
    
    // devSelect(e,contIndex){
    //     let myDevName = e.target.value;
    //     let id = this.projectId;
    //     this.state.developers.map( async (dev, index) => {
    //         if (myDevName === dev.name) {
    //             store.dispatch(selectDevToCont(dev,contIndex))
    //             await axios.put('/updateDevForCont', {proId:id,developer:dev,index:contIndex})
    //         }
    //     })
    // }
    
    check = (e,contIndex) => {
        let tempArr = this.state.Pressed.slice();
        tempArr[contIndex] = !this.state.Pressed[contIndex];
        this.setState({Pressed:tempArr});
    }

    divForFormGroup = {
        marginTop: '80px',
        marginBottom: '80px',
    }
    
    render() {
        
        return (
            <div className="select-dev">
                {this.props.projectFromDB.taskContainers.map((cont, contIndex) => {
                    return(
                        <div style={this.divForFormGroup}>
                        <form>
                        <div className="multiselect" >
                        <div className="selectBox" onClick={(e) => this.check(e,contIndex)}>
                            <select>
                            <option>Select an developer</option>
                            </select>
                            <div className="overSelect"></div>
                        </div>
                        {this.state.Pressed[contIndex] ? <div id="checkboxes">
                        {this.fillDevSelect(contIndex)}
                        </div> : null}
                        </div>
                        </form>
                      
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default connect(state => state)(SelectDev);