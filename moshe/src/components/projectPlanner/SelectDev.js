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
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          developers:[],
        };
    }
    
    componentWillMount() {
        axios.get('http://5c237c1a5db0f6001345ff30.mockapi.io/developers')
        .then((response) => {
            console.log("response", response.data)
            this.setState({developers:response.data})
          })
          .catch(err => {
            console.log("err", err.message);
          })
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
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
        this.state.developers.map((dev, index) => {
            if (myDevName === dev.name) {
                store.dispatch(selectDevToCont(dev,contIndex))
            }
        })
    }

    diForFormGroup = {
        marginTop: '80px',
        marginBottom: '80px',
    }
    
    
    render() {

        return (
            <div className="select-dev">
                {this.props.projectFromDB.taskContainers.map((cont, contIndex) => {
                    return(
                        <div style={this.diForFormGroup}>
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