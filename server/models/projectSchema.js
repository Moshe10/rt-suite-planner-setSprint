const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const projectSchema = {
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
    taskContainers: [{ type: Schema.Types.ObjectId, ref: 'ContainersModel' }]
};

module.exports = ProjectModel = mongoose.model('ProjectModel', projectSchema);
