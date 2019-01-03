import { createStore } from 'redux';
import jquery from 'jquery';



var initState = {
    dataFromHomePage: {
        startProject: new Date(),
        countSprint: null,
        resolutionTasks: [0]
    },
    // taskOnWork: [0,0,0],
    taskOnWork: [],
    currentSprint:null,
    saveData: false,
    projectFromDB:{},
    projectLength:{
        projectName:'',
        length:10,
    },
    toggleSetSprint: true,
    TEST: true,
    project: {
        name: '',
        startDate: null,
        dueDate: null,
        sprintLength: null,
        resolution: [0],
        developers: [
        // { name: 'moshe', email: 'moshb@mail.com', freeWeeks: [true, false, true] },
        // { name: 'avi', email: 'avi@mail.com', freeWeeks: [false, false, true] },
        // { name: 'yosi', email: 'yosi@mail.com', freeWeeks: [false, false, false] },
        // { name: 'ram', email: 'ram@mail.com', freeWeeks: [true, false, true] },
        // { name: 'bob', email: 'bob@mail.com', freeWeeks: [false, true, true] },
        // { name: 'dani', email: 'dani@mail.com', freeWeeks: [false, false, true] },
        // { name: 'mordechy', email: 'mordechy@mail.com', freeWeeks: [true, false, true] },
        // { name: 'shlomo', email: 'shlomo@mail.com', freeWeeks: [false, false, true] },
        // { name: 'yakov', email: 'yakov@mail.com', freeWeeks: [true, false, true] }
        ],
        containers: [
            {
                name: 'back end', week: -1, developers: [], tasks: [
                    { from: 'back end', name: 'task1', length: 5, sprintNum: -1, started: null, status:null },
                    { from: 'back end', name: 'task2', length: 4, sprintNum: -1, started: null, status:null },
                    { from: 'back end', name: 'task3', length: 10, sprintNum: -1, started: null, status:null },
                    { from: 'back end', name: 'task4', length: 1, sprintNum: -1, started: null, status:null }
                ]
            },
            {
                name: 'front end', week: -1, developers: [], tasks: [
                    { from: 'front end', name: 'task5', length: 17, sprintNum: -1, started: null, status:null },
                    { from: 'front end', name: 'task6', length: 1, sprintNum: -1, started: null, status:null },
                    { from: 'front end', name: 'task7', length: 1, sprintNum: -1, started: null, status:null },
                    { from: 'front end', name: 'task8', length: 2, sprintNum: -1, started: null, status:null },
                ]
            },
            {
                name: 'css', week: -1, developers: [], tasks: [
                    { from: 'css', name: 'task10', length: 2, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task11', length: 6, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task11', length: 6, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task12', length: 3, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task13', length: 2, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task14', length: 4, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task15', length: 1, sprintNum: -1, started: null, status:null },
                ]
            },
            {
                name: 'cont4', week: -1, developers: [], tasks: [
                    { from: 'cont4', name: 'task41', length: 9, sprintNum: -1, started: null, status:null },
                    { from: 'cont4', name: 'task42', length: 6, sprintNum: -1, started: null, status:null },
                    { from: 'cont4', name: 'task43', length: 6, sprintNum: -1, started: null, status:null },
                    { from: 'cont4', name: 'task44', length: 13, sprintNum: -1, started: null, status:null },
                ]
            },
            {
                name: 'cont5', week: -1, developers: [], tasks: [
                    { from: 'cont5', name: 'task51', length: 1, sprintNum: -1, started: null, status:null },
                    { from: 'cont5', name: 'task52', length: 2, sprintNum: -1, started: null, status:null },
                    { from: 'cont5', name: 'task53', length: 2, sprintNum: -1, started: null, status:null },
                    { from: 'cont5', name: 'task54', length: 4, sprintNum: -1, started: null, status:null },
                    { from: 'cont5', name: 'task55', length: 1, sprintNum: -1, started: null, status:null },
                    { from: 'cont5', name: 'task56', length: 1, sprintNum: -1, started: null, status:null },
                ]
            },
            {
                name: 'cont6', week: -1, developers: [], tasks: [
                    { from: 'cont6', name: 'task61', length: 5, sprintNum: -1, started: null, status:null },
                    { from: 'cont6', name: 'task62', length: 10, sprintNum: -1, started: null, status:null },
                    { from: 'cont6', name: 'task63', length: 11, sprintNum: -1, started: null, status:null },
                    { from: 'cont6', name: 'task64', length: 1, sprintNum: -1, started: null, status:null },
                ]
            },
            {
                name: 'cont7', week: -1, developers: [], tasks: [
                    { from: 'cont7', name: 'task71', length: 2, sprintNum: -1, started: null, status:null },
                    { from: 'cont7', name: 'task72', length: 1, sprintNum: -1, started: null, status:null },
                    { from: 'cont7', name: 'task73', length: 1, sprintNum: -1, started: null, status:null },
                ]
            },
        ] // end containers.
    }, // end project.
}

const sorter = (a,b) => {
    return a - b;
}


const reducer = function (initState, action) {
    var newState = { ...initState };
    switch (action.type) {
        case 'CREATE_PROJECT':
            newState.projectFromDB = action.payload;
            newState.projectFromDB.resolution = [0];
            console.log(newState.projectFromDB);
            return newState;
        case "SAVE_DATA":
            newState.saveData = true;
            return newState;
        case "SAVE_RESULUTION":
            if (newState.projectFromDB.resolution.includes(parseInt(action.resolution)) || parseInt(action.resolution) == 0) {
                return newState;
            } 
            else {
                let tempArr = newState.projectFromDB.resolution.slice();
                tempArr.push(parseInt(action.resolution));
                tempArr.sort(sorter);
                newState.projectFromDB.resolution = tempArr.slice();
                console.log(newState.projectFromDB.resolution);
            }
            return newState;
        case "DELETE_LAST":
            if (newState.projectFromDB.resolution.length > 1) {
                let tempArr = newState.projectFromDB.resolution.slice();
                tempArr.pop();
                newState.projectFromDB.resolution = tempArr.slice();
            }
            return newState;
        case "DELETE_ALL":
            newState.projectFromDB.resolution = [0]
            return newState;
        case "CREATE_SPRINT":
        if (!jquery.isEmptyObject(newState.projectFromDB)) {
            newState.projectFromDB.sprintLength = action.payload;
        }
        else alert('waiting to press on createProject...')
            return newState;
        case "START_PROJECT":
        if (!jquery.isEmptyObject(newState.projectFromDB)) {
            newState.projectFromDB.startDate = action.date;
            console.log( newState.projectFromDB.startDate);
            }
            return newState;
        case "SET_WEEKS_PROJECT":
            let newProjectLength = {...newState.projectLength};
            newProjectLength.projectName = action.payload.proName;
            newProjectLength.length = action.payload.length;
            newState.projectLength = newProjectLength;
            return newState;
        case "UPDATE_TOGGLE_SET_SPRINT_TO_FALSE":
            if (newState.projectFromDB)
            newState.toggleSetSprint = false;
            newState.currentSprint = action.payload;
            return newState;
        case "UPDATE_TOGGLE_SET_SPRINT_TO_TRUE":
            newState.toggleSetSprint = true;
            return newState;
        case "UPDATE_WEEK_IN_TASK_CONT":
            let newProjectFromDB = {...newState.projectFromDB};
            let newTC = newProjectFromDB.taskContainers.slice();
            let newContainer = {...newTC[action.payload.index]};
            newContainer.week = action.payload.week;
            newTC[action.payload.index] = newContainer;
            newProjectFromDB.taskContainers = newTC;
            newState.projectFromDB = newProjectFromDB;
            return newState;
        case "PLUS_TO_TASK_ON_WORK":
            let contIndex1 = action.payload.contIndex;
            let taskIndex1 = action.payload.taskIndex;
            let tempArr1 = newState.taskOnWork.slice();
            tempArr1[contIndex1] = tempArr1[contIndex1] + newState.projectFromDB.taskContainers[contIndex1].tasks[taskIndex1].length;
            newState.taskOnWork = tempArr1.slice(); 
            return newState;
        case "MINUS_TO_TASK_ON_WORK":
            let contIndex2 = action.payload.contIndex;
            let taskIndex2 = action.payload.taskIndex;
            let tempArr2 = newState.taskOnWork.slice();
            tempArr2[contIndex2] = tempArr2[contIndex2] - newState.projectFromDB.taskContainers[contIndex2].tasks[taskIndex2].length;
            newState.taskOnWork = tempArr2.slice(); 
            return newState;
        case "FILL_TASK_ON_WORK_ARR":
            newState.taskOnWork = action.arr;
            return newState;
        case "SELECT_DEV_TO_CONT":
            let myNewProjectFromDB = {...newState.projectFromDB};
            let myNewTC = myNewProjectFromDB.taskContainers.slice();
            let myNewContainer = myNewTC[action.payload.index];
            if (action.payload.bool) {
                action.payload.developer.busy = true;
                myNewContainer.developers.push(action.payload.developer);
                myNewTC.taskContainers = myNewContainer;
                myNewProjectFromDB.taskContainers = myNewTC;
                newState.projectFromDB = myNewProjectFromDB;
                console.log(newState.projectFromDB.taskContainers);
                
            };
            if (!action.payload.bool) {
                myNewContainer.developers.map((dev,i) => {
                    if (dev.name === action.payload.developer.name) {
                        action.payload.developer.busy = false;
                        myNewContainer.developers.splice(i,1);
                        myNewTC.taskContainers = myNewContainer;
                        myNewProjectFromDB.taskContainers = myNewTC;
                        newState.projectFromDB = myNewProjectFromDB;
                        console.log(newState.projectFromDB.taskContainers);
                    }
                });
            }
            return newState;
        case "LOCK_SPRINT":
            let newProjectFromDb3 = {...newState.projectFromDB};
            newProjectFromDb3.taskContainers[action.payload.contIndex].tasks[action.payload.taskIndex].started = true;
            newProjectFromDb3.taskContainers[action.payload.contIndex].tasks[action.payload.taskIndex].status = 'working';
            newState.projectFromDB = newProjectFromDb3;
            return newState;
        case "UPDATE_SPRINT_NUM_IN_TASK":
        //payload:{contIndex:contIndex,taskIndex:taskIndex,sprintNum:sprintNum}
            let newProjectFromDb4 = {...newState.projectFromDB};
            if (action.payload.sprintNum != -1) {
                newProjectFromDb4.taskContainers[action.payload.contIndex].tasks[action.payload.taskIndex].sprintNum = action.payload.sprintNum;
                newState.projectFromDB = newProjectFromDb4;
            }
            if (action.payload.sprintNum == -1) {
                newProjectFromDb4.taskContainers[action.payload.contIndex].tasks[action.payload.taskIndex].sprintNum = action.payload.sprintNum;
                newState.projectFromDB = newProjectFromDb4;
            }
            return newState;
        case "ZEROS_IN_TASK_ON_WORK_ARR":
            newState.taskOnWork = action.payload.arr;
            return newState;
        default:
            return newState
    }
    return newState;
}


const store = createStore(reducer, initState);

export default store;