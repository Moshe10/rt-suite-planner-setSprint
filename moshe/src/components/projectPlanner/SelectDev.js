import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, ButtonGroup } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { AvField, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import axios from 'axios';
import '../../App.css'
import store from '../../store/store';
import { selectDevToCont } from '../../actions/actions';



class SelectDev extends Component {

    constructor(props) {
        super(props);
        // this.checked = this.checked.bind(this);
        this.state = {
            developers: [],
            isOpen: false,
            // Pressed: [false, false, false, false, false, false, false],
            //   Pressed:[],
        };
    }
    projectId = this.props.projectFromDB._id;

    async componentWillMount() {
        // let allDevForCont = [];
        let devArr = [];
        await axios.get('http://5c237c1a5db0f6001345ff30.mockapi.io/developers')
            .then((response) => {
                // this.setState({developers:response.data})
                devArr = response.data;
            })
            .catch(err => {
                console.log("err", err.message);
            })
        // this.props.projectFromDB.taskContainers.map((cont, index) => {
        //     allDevForCont[index] = devArr;
        // })
        this.setState({
            // developersRepeat: allDevForCont,
            developers: devArr
        });
        // this.setState({ Pressed: this.fillThePressedinState() });
    }

    // fillThePressedinState() {
    //     let falseArr = [];
    //     this.props.projectFromDB.taskContainers.map((cont, index) => {
    //         falseArr.push(false);
    //     })

    //     return falseArr;
    // }


    // async checked(e, index, contIndex, dev) {
    //     let id = this.projectId;
    //     let bool = e.target.checked;
    //     store.dispatch(selectDevToCont(dev, contIndex, bool));
    //     await axios.put('/updateDevForCont', { proId: id, developer: dev, index: contIndex, bool: bool })
    // }

    // fillDevSelect(contIndex) {
    //     let arr = [];
    //     this.state.developers[contIndex].map((dev, index) => {

    //         arr.push(<label>
    //             <input type="checkbox" checked={dev.busy} onChange={(e) => this.checked(e, index, contIndex, dev)} id={"one" + index} />{dev.name}
    //         </label>)
    //     })
    //     return arr
    // }

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

    // check = (e, contIndex) => {
    //     let tempArr = this.state.Pressed.slice();
    //     tempArr[contIndex] = !this.state.Pressed[contIndex];
    //     this.setState({ Pressed: tempArr });
    // }

    // divForFormGroup = {
    //     marginTop: '80px',
    //     marginBottom: '80px',
    // }

    render() {
        return (
            <div className="row" style={{ minHeight: this.props.cellHeight, maxHeight: this.props.cellHeight }}>
                <div onClick={(e) => { this.setState({ isOpen: !this.state.isOpen }) }}>
                    <h3><Badge id={'devSelect' + this.props.index} >
                        {this.props.container.developers.length == 0 ? "Choose Developers" : this.props.container.developers.reduce((concat, developer) =>
                            (concat + "  " + "".join(developer.name.split(" ")).toUpperCase(), ""))}
                    </Badge></h3>
                </div>
                <Popover placement="bottom" isOpen={this.state.isOpen} target={'devSelect' + this.props.index}>
                    <PopoverHeader>Select Developers:</PopoverHeader>
                    <PopoverBody>
                        <ButtonGroup vertical>
                            {this.state.developers.map((dev, i) => {
                                let isChecked = this.props.container.developers.reduce((a, b) => (a || b.name === dev.name), false)
                                return (
                                    <Button
                                        key = {"dev"+i+"cont"+this.props.index}
                                        color={isChecked ? "secondary" : "primary"}
                                        style={{ marginLeft: "15px" }}
                                        onClick={() => {this.props.devAssinmentHandler(dev, this.props.index)}}>
                                        {dev.name}
                                    </Button>
                                )
                            })}
                        </ButtonGroup>
                    </PopoverBody>
                </Popover>
            </div>
            // <div className="select-dev">
            //     {this.props.projectFromDB.taskContainers.map((cont, contIndex) => {
            //         return(
            //             <div style={this.divForFormGroup}>
            //             <form>
            //             <div className="multiselect" >
            //             <div className="selectBox" onClick={(e) => this.check(e,contIndex)}>
            //                 <select>
            //                 <option>Select an developer</option>
            //                 </select>
            //                 <div className="overSelect"></div>
            //             </div>
            //             {this.state.Pressed[contIndex] ? <div id="checkboxes">
            //             {this.fillDevSelect(contIndex)}
            //             </div> : null}
            //             </div>
            //             </form>

            //             </div>
            //         )
            //     })}
            // </div>
        );
    }
}

export default connect(state => state)(SelectDev);