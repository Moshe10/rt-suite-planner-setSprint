const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    from: String, // to equale task to container
    name: String, // task name
    length: Number, // length of task in development days (we will sum them to generate the length of a container) - to check? the data might come in in work hours (ask Effort team)
    started: Boolean, // marks if the task already started in an earlier sprint (will be used in Sprint Creation Page)
    sprintNum: Number // when the task is assigned to a sprint - this field will hold the sprint number it belongs to
});

const containersSchema  = new Schema({
    name: String, // container name
    week: Number, // the first project week it was asigned to (where 0 is the first week of the project)
    developers: [String], // we will represent a developer by is e-mail address
    tasks:[taskSchema]
});

const AllprojectModel = new Schema({
    name: String,
    startDate: String,
    dueDate: String, // can be calculated when we know start date and the project's duration
    sprintLength: Number,
    // project's task completion resolutiom e.g. [20,60,80] represents a project
    // on which we have trello lists of 0%, 20%, 60%, 80%, 100% (0 and 100 does not have to be saved)
    resolution: [Number],
    // list of developers that work on a project
    // freeWeeks is an array with indexes coresponding to the project weeks which represent in which
    // weeks the programmer is busy (true=busy, false=available)
    developers: [{
        name: String,
        email: String, // for trello authentication purposes
        freeWeeks: [Boolean]
    }],
    // seperate explenation
    taskContainers: [containersSchema]
});


module.exports = mongoose.model('AllprojectModel', AllprojectModel);
