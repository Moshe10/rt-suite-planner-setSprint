import { createStore } from 'redux';


var initState = {

    projectFromDB:{},
    project1: {
        name: 'project1',
        startDate: null,
        dueDate: '10/10/10',
        sprintLength: 2,
        rezolution: [],
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
                name: 'back end', week: 3, developers: [], tasks: [
                    { from: 'back end', name: 'task1', length: 5, sprintNum: -1, started: null },
                    { from: 'back end', name: 'task2', length: 4, sprintNum: -1, started: null },
                    { from: 'back end', name: 'task3', length: 3, sprintNum: -1, started: null },
                    { from: 'back end', name: 'task4', length: 1, sprintNum: -1, started: null }
                ]
            },
            {
                name: 'front end', week: 4, developers: [], tasks: [
                    { from: 'front end', name: 'task5', length: 7, sprintNum: 4, started: true },
                    { from: 'front end', name: 'task6', length: 1, sprintNum: -1, started: null },
                    { from: 'front end', name: 'task7', length: 1, sprintNum: 4, started: true },
                    { from: 'front end', name: 'task8', length: 2, sprintNum: -1, started: null },
                ]
            },
            {
                name: 'css', week: 4, developers: [], tasks: [
                    { from: 'css', name: 'task10', length: 9, sprintNum: -1, started: null },
                    { from: 'css', name: 'task11', length: 6, sprintNum: -1, started: null },
                    { from: 'css', name: 'task11', length: 6, sprintNum: 1, started: true },
                    { from: 'css', name: 'task12', length: 3, sprintNum: -1, started: null },
                ]
            }
        ] // end containers.
    }, // end project.
}

const reducer = function (initState, action) {
    var newState = { ...initState };
    switch (action.type) {
        case 'CREATE_PROJECT':
            newState.projectFromDB = action.payload;
            console.log(newState.projectFromDB);
            return newState;

        default:
            return newState
    }
    return newState;
}


const store = createStore(reducer, initState);

export default store;