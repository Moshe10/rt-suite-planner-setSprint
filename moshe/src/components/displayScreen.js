import React, { Component } from 'react';
import { connect } from "react-redux";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from '../App';
import HomePage from './homePage';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import store from '../store/store';



class DisplayScreen extends Component {
    constructor(){
        super()
       
    }
  /**Checks if the necessary parameters have been inserted and then the main page will open
 */
    Test = () => {
        if (this.props.saveData){
            return (
                <App/>
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
                      

                        <Route exact path='/' component={this.Test} />
                       

                    </div>
                </BrowserRouter>
         
        )
    }
}
export default connect(stata => stata)(DisplayScreen)
