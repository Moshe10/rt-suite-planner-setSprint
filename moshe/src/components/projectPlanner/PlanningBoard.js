import React, { Component } from 'react';
import { Stage, Layer, Line, Text, Group, Rect } from 'react-konva';
import { functionalTaskContainer } from "./taskContainer";
import Buttons from './buttonSetSprint';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import StartDate from '../StartDate';
import SelectDev from './SelectDev';
import store from '../../store/store';
import { selectDevToCont } from '../../actions/actions';


class PlanningBoard extends Component {
    constructor(props) {
        super(props);
        let tempGridX = [this.props.firstCellWidth];
        let tempGridY = [this.props.cellHeight];
        for (let i = 1; (i <= this.props.data.projectLength); i++) {
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
            selectDevsOpen: [],
        };
    }

    updateGridX() {
        let tempGridX = [this.props.firstCellWidth];
        for (let i = 1; i <= this.props.data.projectLength && (i <= this.props.maxCellsPerScreen); i++) {
            tempGridX.push(this.props.firstCellWidth + i * this.props.cellWidth);
        }
        this.setState({
            gridX: tempGridX,
            selectDevsOpen: [false] * this.state.projectFromDB.taskContainers.length
        });
    }

    devAssinmentHandler(devObj, containerIndex) {
        
        store.dispatch(selectDevToCont(devObj.name, containerIndex));
    }

    render() {
        if (this.state.gridX.length != this.props.data.projectLength + 1 &&
            this.state.gridX.length != this.props.maxCellsPerScreen + 1) {
            this.updateGridX();
        }

        return (
            <div className="row">
                <div className="col-2" style={{ marginLeft: "20px", paddingTop: window.innerHeight * 0.05 + this.state.cellHeight }}>
                    {this.props.projectFromDB.taskContainers.map((container, index) => {
                        return (
                            <SelectDev key={'selDevelopers' + index} index={index} container={container} cellHeight={this.state.cellHeight} devAssinmentHandler={this.devAssinmentHandler} />
                        );
                    })}
                </div>
                <div className="col-9">
                    <div style={{
                        // paddingRight: window.innerWidth * 0.05,
                        // paddingLeft: window.innerWidth * 0.05,
                        paddingTop: window.innerHeight * 0.05,
                        paddingBottom: window.innerHeight * 0.05
                    }}>
                        <Stage
                            width={this.state.firstCellWidth + this.state.cellWidth * Math.min(this.props.maxCellsPerScreen, this.props.data.projectLength - this.props.offset)}
                            height={(1 + this.props.data.containers.length) * this.props.cellHeight}
                        >
                            <Layer>
                                {this.state.gridX.map((item, index) => {
                                    return (<Line key={"lineX" + index} stroke="black"
                                        points={[item, 0, item, this.state.gridY.slice(-1).pop()]} />)
                                })}
                                {this.props.data.weeks.slice(this.props.offset, Math.min(this.props.data.weeks.length, this.props.offset + this.props.maxCellsPerScreen)).map((week, index) => (
                                    <Text
                                        x={this.state.firstCellWidth + index * this.state.cellWidth + 15}
                                        y={15}
                                        key={'weekLable' + index}
                                        text={week[0] + "\n" + week[1]}
                                        fill={"black"}
                                        fontFamily={'david'}
                                        fontStyle={'bold'}
                                        fontSize={15}
                                    />
                                ))
                                }
                                {this.props.data.containers.map((item, index) => {
                                    if (item.week !== -1) {
                                        return functionalTaskContainer({
                                            type: "hasWeek",
                                            row: index,
                                            col: this.props.data.containers[index].week,
                                            offset: this.props.offset,
                                            cellHeight: this.state.cellHeight,
                                            containerName: item.contName,
                                            firstCellWidth: this.state.firstCellWidth,
                                            cellWidth: this.state.cellWidth,
                                            stageWidth: this.state.firstCellWidth + this.state.cellWidth * Math.min(this.props.maxCellsPerScreen, this.props.data.projectLength - this.props.offset),
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
                                            }), true),
                                            unlock: this.props.unlock
                                        })
                                    } else {
                                        return (<Group key={index}></Group>)
                                    }
                                })}
                                <Rect
                                    x={0}
                                    y={0}
                                    width={this.state.firstCellWidth - 1}
                                    height={this.state.gridX.slice(-1).pop()}
                                    fill="#DDDDDD"
                                />
                                {this.state.gridY.map((item, index) => {
                                    return (<Line key={"lineY" + index} stroke="black"
                                        points={[0, item, this.state.gridX.slice(-1).pop(), item]} />)
                                })}
                                {this.props.data.containers.map((item, index) => {
                                    if (item.week === -1) {
                                        return functionalTaskContainer({
                                            type: "noWeek",
                                            row: index,
                                            col: this.props.data.containers[index].week,
                                            offset: this.props.offset,
                                            cellHeight: this.state.cellHeight,
                                            stageWidth: this.state.firstCellWidth + this.state.cellWidth * Math.min(this.props.maxCellsPerScreen, this.props.data.projectLength - this.props.offset),
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
                                            }), true),
                                            unlock: this.props.unlock
                                        })
                                    } else {
                                        return (<Group key={index}></Group>)
                                    }
                                })}

                            </Layer>
                        </Stage>
                        <Buttons offset={this.props.offset} maxCellsPerScreen={this.props.maxCellsPerScreen} />
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(state => state)(PlanningBoard);