import React, { Component } from 'react';
import { connect } from "react-redux";
import HomePage from './homePage';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import DisplayScreenSprint from './projectPlanner/displayScreenSprint';



class DisplayScreen extends Component {
    constructor(){
        super()
       
    }
    hendleChangeWeekHandler(index, week){
        console.log(index,week);
        
    }

    Toggle = () => {
        if (this.props.saveData){
            return (
                <DisplayScreenSprint/>
            )
        }
        else {
            return (
              <HomePage/>
            )
        }
    }

    render() {
        return (
        
                <BrowserRouter>
                    <div className="mainDiv">

                        <Link to="/"></Link>

                        <Route exact path='/' component={this.Toggle} />

                    </div>
                </BrowserRouter>
        )
    }
}
export default connect(stata => stata)(DisplayScreen)
