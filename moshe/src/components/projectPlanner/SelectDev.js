import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

class SelectDev extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }
    
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    
    

    render() {

        return (
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                    select developers
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem header>all developers</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default connect(state => state)(SelectDev);