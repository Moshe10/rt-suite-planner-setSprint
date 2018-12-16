import { createStore } from 'redux';
import jquery from 'jquery';


var initState = {
    dataFromHomePage: {
        startProject: new Date(),
        countSprint: null,
        resolutionTasks: [0]
    },
    currentSprint:null,
    saveData: false,
    projectFromDB:{},
    projectLength:{
        projectName:'',
        length:null,
    },
    toggleSetSprint: true,
    TEST: true,
    project1: {
        name: 'project1',
        startDate: new Date(),
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
                name: 'back end', week: null, developers: [], tasks: [
                    { from: 'back end', name: 'task1', length: 5, sprintNum: -1, started: null, status:null },
                    { from: 'back end', name: 'task2', length: 4, sprintNum: -1, started: null, status:null },
                    { from: 'back end', name: 'task3', length: 3, sprintNum: -1, started: null, status:null },
                    { from: 'back end', name: 'task4', length: 1, sprintNum: -1, started: null, status:null }
                ]
            },
            {
                name: 'front end', week: null, developers: [], tasks: [
                    { from: 'front end', name: 'task5', length: 7, sprintNum: 4, started: true, status:null },
                    { from: 'front end', name: 'task6', length: 1, sprintNum: -1, started: null, status:null },
                    { from: 'front end', name: 'task7', length: 1, sprintNum: 4, started: true, status:null },
                    { from: 'front end', name: 'task8', length: 2, sprintNum: -1, started: null, status:null },
                ]
            },
            {
                name: 'css', week: null, developers: [], tasks: [
                    { from: 'css', name: 'task10', length: 9, sprintNum: -1, started: null, status:'done' },
                    { from: 'css', name: 'task11', length: 6, sprintNum: -1, started: null, status:null },
                    { from: 'css', name: 'task11', length: 6, sprintNum: 1, started: true, status:null },
                    { from: 'css', name: 'task12', length: 3, sprintNum: -1, started: null, status:null },
                ]
            }
        ] // end containers.
    }, // end project.
}

const sorter = (a,b) => {
    return a - b;
}
let newResolutionTasks = [];

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
            if (newState.projectFromDB.resolution.includes(parseInt(action.resulution)) || parseInt(action.resulution) == 0) {
                return newState;
            } 
            else {
                newResolutionTasks.push(parseInt(action.resulution));
                newResolutionTasks.sort(sorter);
                newState.projectFromDB.resolution = newResolutionTasks.slice();
                console.log(newState.projectFromDB.resolution);
                
                return newState;
            }
        case "DELETE_LAST":
            newState.project1.resolution.pop()
            return newState;
        case "DELETE_ALL":
            newState.project1.resolution = [0]
            return newState;
        case "CREATE_SPRINT":
        if (!jquery.isEmptyObject(newState.projectFromDB)) {
            newState.projectFromDB.sprintLength = action.payload;
            console.log(newState.projectFromDB.sprintLength);
        }
        else alert('waiting to press on createProject...')
            return newState;
        case "START_PROJECT":
            newState.project1.startDate = action.date;
            return newState;
        case "SET_WEEKS_PROJECT":
            newState.projectLength.projectName = action.payload.proName;
            newState.projectLength.length = action.payload.length;
            return newState;
        case "UPDATE_TOGGLE_SET_SPRINT_TO_FALSE":
            newState.toggleSetSprint = false;
            console.log(action.payload);
            newState.currentSprint = action.payload;
            return newState;
        case "UPDATE_TOGGLE_SET_SPRINT_TO_TRUE":
            newState.toggleSetSprint = true;
            return newState;
        default:
            return newState
    }
    return newState;
}


const store = createStore(reducer, initState);

export default store;