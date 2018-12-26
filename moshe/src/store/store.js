import { createStore } from 'redux';
import jquery from 'jquery';



var initState = {
    dataFromHomePage: {
        startProject: new Date(),
        countSprint: null,
        resolutionTasks: [0]
    },
    taskOnWork: [0,0,0],
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
        { name: 'moshe', email: 'moshb@mail.com', freeWeeks: [true, false, true] },
        { name: 'avi', email: 'avi@mail.com', freeWeeks: [false, false, true] },
        { name: 'yosi', email: 'yosi@mail.com', freeWeeks: [false, false, false] },
        { name: 'ram', email: 'ram@mail.com', freeWeeks: [true, false, true] },
        { name: 'bob', email: 'bob@mail.com', freeWeeks: [false, true, true] },
        { name: 'dani', email: 'dani@mail.com', freeWeeks: [false, false, true] },
        { name: 'mordechy', email: 'mordechy@mail.com', freeWeeks: [true, false, true] },
        { name: 'shlomo', email: 'shlomo@mail.com', freeWeeks: [false, false, true] },
        { name: 'yakov', email: 'yakov@mail.com', freeWeeks: [true, false, true] }
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
                    { from: 'css', name: 'task10', length: 9, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task11', length: 6, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task11', length: 6, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task12', length: 3, sprintNum: -1, started: null, status:null },
                ]
            }
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
            newState.projectFromDB.startDate = action.date;
            console.log( newState.projectFromDB.startDate);
            
            return newState;
        case "SET_WEEKS_PROJECT":
            let newProjectLength = {...newState.projectLength};
            newProjectLength.projectName = action.payload.proName;
            newProjectLength.length = action.payload.length;
            newState.projectLength = newProjectLength;
            return newState;
        case "UPDATE_TOGGLE_SET_SPRINT_TO_FALSE":
            newState.toggleSetSprint = false;
            newState.currentSprint = action.payload;
            return newState;
        case "UPDATE_TOGGLE_SET_SPRINT_TO_TRUE":
            newState.toggleSetSprint = true;
            return newState;
        case "UPDATE_WEEK_IN_TASK_CONT":
            let newProjectFromDB = {...newState.projectFromDB};
            let newTC = newProjectFromDB.taskContainers.slice();
            let newContainer = newTC[action.payload.index];
            newContainer.week = action.payload.week;
            newTC.taskContainers = newContainer;
            newProjectFromDB.taskContainers = newTC;
            newState.projectFromDB = newProjectFromDB
            // taskContainers[action.payload.index].week = action.payload.week;
            return newState;
        case "PLUS_TO_TASK_ON_WORK":
            let contIndex1 = action.payload.contIndex;
            let taskIndex1 = action.payload.taskIndex;
            // newState.taskOnWork[contIndex1] = newState.taskOnWork[contIndex1] + newState.projectFromDB.taskContainers[contIndex1].tasks[taskIndex1].length;
            let tempArr1 = newState.taskOnWork.slice();
            tempArr1[contIndex1] = tempArr1[contIndex1] + newState.projectFromDB.taskContainers[contIndex1].tasks[taskIndex1].length;
            newState.taskOnWork = tempArr1.slice(); 
            return newState;
        case "MINUS_TO_TASK_ON_WORK":
            let contIndex2 = action.payload.contIndex;
            let taskIndex2 = action.payload.taskIndex;
            // newState.taskOnWork[contIndex2] = newState.taskOnWork[contIndex2] - newState.projectFromDB.taskContainers[contIndex2].tasks[taskIndex2].length;
            let tempArr2 = newState.taskOnWork.slice();
            tempArr2[contIndex2] = tempArr2[contIndex2] - newState.projectFromDB.taskContainers[contIndex2].tasks[taskIndex2].length;
            newState.taskOnWork = tempArr2.slice(); 
            return newState;
        case "FILL_TASK_ON_WORK_ARR":
            newState.taskOnWork = action.arr;
            return newState;
        default:
            return newState
    }
    return newState;
}


const store = createStore(reducer, initState);

export default store;