import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import '../../App.css'
import store from '../../store/store';
import { selectDevToCont } from '../../actions/actions';
 


class SelectDev extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          developers:[],
        };
    }
    projectId = this.props.projectFromDB._id;
    
    componentWillMount() {
        axios.get('http://5c237c1a5db0f6001345ff30.mockapi.io/developers')
        .then((response) => {
            this.setState({developers:response.data})
          })
          .catch(err => {
            console.log("err", err.message);
          })
    }


    fillDevSelect() {
        var arr = [<option style={{color:"blue"}}>select dev</option>]
        this.state.developers.map((dev, index) => {
            arr.push(<option key={index} value={dev.name} key={index}>{dev.name}</option>)
        })
        return arr
    }

    devSelect(e,contIndex){
        let myDevName = e.target.value;
        let id = this.projectId;
        this.state.developers.map( async (dev, index) => {
            if (myDevName === dev.name) {
                store.dispatch(selectDevToCont(dev,contIndex))
                await axios.put('/updateDevForCont', {proId:id,developer:dev,index:contIndex})
            }
        })
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
                        <FormGroup>
                            <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={(e) => this.devSelect(e,contIndex)}
                            >
                            {this.fillDevSelect()}
                            </Input>
                        </FormGroup>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default connect(state => state)(SelectDev);