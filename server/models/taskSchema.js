const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = {
    from: String, // to equale task to container
    name: String, // task name
    length: Number, // length of task in development days (we will sum them to generate the length of a container) - to check? the data might come in in work hours (ask Effort team)
    started: Boolean, // marks if the task already started in an earlier sprint (will be used in Sprint Creation Page)
    sprintNum: Number // when the task is assigned to a sprint - this field will hold the sprint number it belongs to
};

module.exports = TaskModel = mongoose.model('TaskModel', taskSchema);