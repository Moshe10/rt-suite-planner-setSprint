import React, {Component} from 'react';
import {Stage, Layer, Line, Rect} from 'react-konva';
import {functionalTaskContainer} from "./taskContainer";
import Buttons from './buttonSetSprint';
import { connect } from 'react-redux';


class PlanningBoard extends Component {
    constructor(props) {
        super(props);
        let tempGridX = [this.props.firstCellWidth];
        let tempGridY = [this.props.cellHeight];
        for (let i = 1; i <= this.props.data.projectLength; i++) {
            tempGridX.push(this.props.firstCellWidth + i * this.props.cellWidth);
        }
        for (let i = 1; i <= this.props.data.containers.length; i++) {
            tempGridY.push(this.props.cellHeight + i * this.props.cellHeight);
        }
        this.state = {
            cellHeight: this.props.cellHeight,
            cellWidth: this.props.cellWidth,
            firstCellWidth: this.props.firstCellWidth,
            gridX: tempGridX,
            gridY: tempGridY,
        };
    }

    render() {
        return (
            <div /*style={{display:'flex'}}*/>
                {/* <div style={{border:'black solid 3px',
                             flex:'1',
                             height:'500px',
                             width:'100px',
                            }}>

                </div> */}
                <div style={{
                    // background: 'blue',
                    // border:'black solid 3px',
                    // marginLeft: '100px',
                    // flex:'1',
                    paddingRight: window.innerWidth * 0.05,
                    paddingLeft: window.innerWidth * 0.05,
                    paddingTop: window.innerHeight * 0.05,
                    paddingBottom: window.innerHeight * 0.05
                }}>
                    <Stage
                        width={3000}
                        height={(1 + this.props.data.containers.length) * this.props.cellHeight}
                    >
                        <Layer>
                            {this.state.gridX.map((item, index) => {
                                return (<Line key={"lineX" + index} stroke="black"
                                            points={[item, 0, item, this.state.gridY.slice(-1).pop()]}/>)
                            })}
                            {this.state.gridY.map((item, index) => {
                                return (<Line key={"lineY" + index} stroke="black"
                                            points={[0, item, this.state.gridX.slice(-1).pop(), item]}/>)
                            })}
                            {this.props.data.containers.map((item, index) => {
                                return functionalTaskContainer({
                                    row: index,
                                    col: this.props.data.containers[index].week,
                                    offset: this.props.offset,
                                    cellHeight: this.state.cellHeight,
                                    containerName: item.contName,
                                    firstCellWidth: this.state.firstCellWidth,
                                    cellWidth: this.state.cellWidth,
                                    length: item.tasks.reduce(((a, b) => {
                                        return a + b.taskLength
                                    }), 0),
                                    percentageDone: item.tasks.reduce(((a, b) => {
                                        return a + ((b.status === "done") ? b.taskLength : 0)
                                    }), 0) / item.tasks.reduce(((a, b) => {
                                        return a + b.taskLength
                                    }), 0),
                                    changeWeekHandler: ((week) => this.props.changeWeekHandler(index, week)),
                                    percentageWorking: item.tasks.reduce(((a, b) => {
                                        return a + ((b.status === "working") ? b.taskLength : 0)
                                    }), 0) / item.tasks.reduce(((a, b) => {
                                        return a + b.taskLength
                                    }), 0),
                                    draggable: item.tasks.reduce(((a, b) => {
                                        return a && b.status === "null"
                                    }), true)
                                })
                            })}
                            {/* <Rect width={this.state.firstCellWidth - 1}*/}
                                {/*height={(this.props.data.containers.length + 1) * this.state.cellHeight}*/}
                                {/*fill = {'white'}*/}
                            {/*/>*/}
                            {/*{this.props.data.containers.filter(item=>{return item.week === 0}).map((item, index) => {*/}
                                {/*return functionalTaskContainer({*/}
                                    {/*row: index,*/}
                                    {/*col: this.props.data.containers[index].week,*/}
                                    {/*offset: this.props.offset,*/}
                                    {/*cellHeight: this.state.cellHeight,*/}
                                    {/*containerName: item.contName,*/}
                                    {/*firstCellWidth: this.state.firstCellWidth,*/}
                                    {/*cellWidth: this.state.cellWidth,*/}
                                    {/*length: item.tasks.reduce(((a, b) => {*/}
                                        {/*return a + b.taskLength*/}
                                    {/*}), 0),*/}
                                    {/*percentageDone: item.tasks.reduce(((a, b) => {*/}
                                        {/*return a + ((b.status === "done") ? b.taskLength : 0)*/}
                                    {/*}), 0) / item.tasks.reduce(((a, b) => {*/}
                                        {/*return a + b.taskLength*/}
                                    {/*}), 0),*/}
                                    {/*changeWeekHandler: ((week) => this.props.changeWeekHandler(index, week)),*/}
                                    {/*percentageWorking: item.tasks.reduce(((a, b) => {*/}
                                        {/*return a + ((b.status === "working") ? b.taskLength : 0)*/}
                                    {/*}), 0) / item.tasks.reduce(((a, b) => {*/}
                                        {/*return a + b.taskLength*/}
                                    {/*}), 0),*/}
                                    {/*draggable: item.tasks.reduce(((a, b) => {*/}
                                        {/*return a && b.status === "null"*/}
                                    {/*}), true)*/}
                                {/*})*/}
                            {/*})} */}
                        </Layer>
                    </Stage>
                <Buttons/>
            </div>
        </div>
        );
    }
}

export default connect(state => state)(PlanningBoard);