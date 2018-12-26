import React from 'react';
import {Group, Rect, Text} from 'react-konva';
import Konva from 'konva'

export function functionalTaskContainer(properties) {
    function handleDragStart(e, properties) {
        e.target.setAttrs({
            width: ((Math.ceil(properties.length / 5)) * properties.cellWidth) - 10,
            shadowOffset: {
                x: 15,
                y: 15
            },
            scaleX: 1.1,
            scaleY: 1.1
        });
    }

    function findWhereToLand(x, firstCellWidth, cellWidth, offset) {
        let cell = 0;
        while (x > firstCellWidth + (cell - offset) * cellWidth) {
            cell++;
        }
        return cell-1;
    }

    function handleDragMove(e, properties) {
        e.target.children.forEach((child) => {
            if (child.className === "Rect") {
                switch (child.getAttr("name").split(' ')[0]) {
                    case "mainRect":
                        child.to({
                            duration: 0.01,
                            width: ((Math.ceil(properties.length / 5)) * properties.cellWidth) - 10
                        });
                        break;
                    case "workingRect":
                        child.to({
                            duration: 0.01,
                            width: ((Math.ceil(properties.length / 5) * properties.cellWidth) - 10) * (properties.percentageDone + properties.percentageWorking)
                        });
                        break;
                    case "doneRect":
                        child.to({
                            duration: 0.01,
                            width: ((Math.ceil(properties.length / 5) * properties.cellWidth) - 10) * properties.percentageDone
                        });
                        break;
                    default:
                        break;
                }
            }
        });

        e.target.setAttrs({
            y: (properties.row + 1) * properties.cellHeight
        });
    }

    function handleDragEnd(e, properties) {
        let week = findWhereToLand(e.target.attrs.x, properties.firstCellWidth, properties.cellWidth,properties.offset);
        properties.changeWeekHandler(week);
        e.target.to({
            duration: 0.05,
            easing: Konva.Easings.EaseIn,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            x:week > -1 ? (properties.firstCellWidth + (week - properties.offset) * properties.cellWidth) : 0
        });
        if (week == -1) {
            e.target.children.forEach((child) => {
                let newWidth = properties.firstCellWidth - 10;
                if (child.className === "Rect") {
                    switch (child.getAttr("name").split(' ')[0]) {
                        case "mainRect":
                            child.to({
                                duration: 0.01,
                                width: newWidth
                            });
                            break;
                        case "workingRect":
                            child.to({
                                duration: 0.01,
                                width: newWidth * (properties.percentageDone + properties.percentageWorking)
                            });
                            break;
                        case "doneRect":
                            child.to({
                                duration: 0.01,
                                width: newWidth * properties.percentageDone
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }

    return (
        <Group
            key={"container-" + properties.row}
            x={properties.col > -1 ? (properties.firstCellWidth + (properties.col - properties.offset) * properties.cellWidth) : 0}
            y={(properties.row + 1) * properties.cellHeight}
            draggable={properties.draggable || false}
            onDragStart={(e) => handleDragStart(e, properties)}
            onDragMove={(e) => handleDragMove(e, properties)}
            onDragEnd={(e) => handleDragEnd(e, properties)}
        >
            <Rect
                name={"mainRect of " + properties.row}
                x={5}
                y={5}
                width={properties.col === -1 ? properties.firstCellWidth - 10 : ((Math.ceil(properties.length / 5)) * properties.cellWidth) - 10}
                height={properties.cellHeight - 10}
                fill="#5BC0EB"
                shadowBlur={10}
                cornerRadius={5}
            />{/* blue general block*/}
            <Rect
                name={"workingRect of " + properties.row}
                x={5}
                y={5}
                width={(properties.col === -1 ? properties.firstCellWidth - 10 : ((Math.ceil(properties.length / 5)) * properties.cellWidth) - 10) * (properties.percentageDone + properties.percentageWorking)}
                height={properties.cellHeight - 10}
                fill="#FDE74C"
                cornerRadius={5}
            />{/* yellow working progress*/}
            <Rect
                name={"doneRect of " + properties.row}
                x={5}
                y={5}
                width={(properties.col === -1 ? properties.firstCellWidth - 10 : ((Math.ceil(properties.length / 5)) * properties.cellWidth) - 10) * properties.percentageDone}
                height={properties.cellHeight - 10}
                fill="#9BC53D"
                cornerRadius={5}
            />{/* green done progress*/}
            <Text
                x={15}
                y={15}
                text={properties.containerName}
                fill={"white"}
                fontFamily={'david'}
                fontStyle={'bold'}
                shadowBlur={5}
                fontSize={20}
            />
        </Group>
    )
}
