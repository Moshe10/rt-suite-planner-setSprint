import React, { Component } from 'react';
import './App.css';
import SetSprint from './components/setSprint';
import { connect } from 'react-redux';
import PlanningBoard from './components/projectPlanner/PlanningBoard';
import DisplayScreen from './components/displayScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DisplayScreen /> 
      </div>
    );
  }
}

export default connect(state => state)(App);
