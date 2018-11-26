import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';


class ToDoTask extends Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.state = {
            toDoArr: [...this.props.toDoTaskList]
        };
    }
    
    componentWillUpdate(nextProps, nextState) {
        console.log("AAAAAAAAAAAAAAAAA");
        
        console.log(nextProps, nextState);
        
    }

    createTaskToDo = () => {
        if(this.state.toDoArr.length > 0){
            return(
                this.state.toDoArr.map(elm => {
                    return (<ListGroupItem color="success">{elm.name}</ListGroupItem>)
                })
            )
        }
    }

    show(){
        console.log(this.state.toDoArr);
    }

  render() {
    return (
        <div className="myborder">
        <button onClick={this.show}>show</button>
            <ListGroup>
                <h1>ToDo Tasks</h1>
                {this.createTaskToDo()}
            </ListGroup>
        </div>
    );
  }
}

export default connect(state => state)(ToDoTask);