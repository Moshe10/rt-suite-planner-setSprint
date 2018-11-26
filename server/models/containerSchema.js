const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const containersSchema = {
    name: String, // container name
    week: Number, // the first project week it was asigned to (where 0 is the first week of the project)
    developers: [String], // we will represent a developer by is e-mail address
    tasks: [{ type: Schema.Types.ObjectId, ref: 'TaskModel' }]
};


module.exports = ContainersModel = mongoose.model('ContainersModel', containersSchema);