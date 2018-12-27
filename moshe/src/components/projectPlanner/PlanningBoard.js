import React, { Component } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import { functionalTaskContainer } from "./taskContainer";
import Buttons from './buttonSetSprint';
import { connect } from 'react-redux';
import StartDate from '../StartDate';
import SelectDev from './SelectDev';


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

    updateGridX() {
        let tempGridX = [this.props.firstCellWidth];
        for (let i = 1; i <= this.props.data.projectLength; i++) {
            tempGridX.push(this.props.firstCellWidth + i * this.props.cellWidth);
        }
        this.setState({
            gridX: tempGridX,
        });
    }

    render() {
        if (this.state.gridX.length != this.props.data.projectLength + 1) {
            this.updateGridX();
        }

        return (
            <div className="row">
            <div className="col-1">
                <SelectDev/>
            </div>
            <div className="col-10">
            <div style={{
                paddingRight: window.innerWidth * 0.05,
                paddingLeft: window.innerWidth * 0.05,
                paddingTop: window.innerHeight * 0.05,
                paddingBottom: window.innerHeight * 0.05
            }}>
                <Stage
                    width={this.state.firstCellWidth + this.state.cellWidth*this.props.data.projectLength}
                    height={(1 + this.props.data.containers.length) * this.props.cellHeight}
                >
                    <Layer>
                        {this.state.gridX.map((item, index) => {
                            return (<Line key={"lineX" + index} stroke="black"
                                points={[item, 0, item, this.state.gridY.slice(-1).pop()]} />)
                        })}
                        {this.state.gridY.map((item, index) => {
                            return (<Line key={"lineY" + index} stroke="black"
                                points={[0, item, this.state.gridX.slice(-1).pop(), item]} />)
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
                                    return a && b.status === null
                                }), true)
                            })
                        })}
                    </Layer>
                </Stage>
                <Buttons />
                <StartDate/>
            </div>
            </div>
        </div>
        
        );
    }
}

export default connect(state => state)(PlanningBoard);