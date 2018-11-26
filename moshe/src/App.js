import React, { Component } from 'react';
import './App.css';
import SetSprint from './components/setSprint';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SetSprint /> 
      </div>
    );
  }
}

export default connect(state => state)(App);
