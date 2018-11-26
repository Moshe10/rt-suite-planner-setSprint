const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
var ProjectModel = require('./models/projectSchema');
var TaskModel = require('./models/taskSchema');
var ContainersModel = require('./models/containerSchema');


var mongoPath = 'mongodb://127.0.0.1/my_mongoose';

mongoose.connect(mongoPath, { useNewUrlParser: true });
var mongooseDb = mongoose.connection;

const app = express();

app.use(bodyParser.json());

// create the all project in mongoose. 
app.post('/createProject', (req, res) => {
    res.send('project started 1')
    let project = new ProjectModel({
        name: req.body.name,
        developers: req.body.developers,
    })
    project.save(function (err, newProject) {
        if (err) return handleError(err);
        let containers = req.body.containers;
        let num1 = req.body.containers.length;

        containers.map((doc, index) => {

            const newContainer = new ContainersModel({
                name: doc.name,
                week: doc.week,
                developers: doc.developers
            });

            newContainer.save(function (err, container) {
                newProject.taskContainers.push(newContainer);
                let num2 = doc.tasks.length;
                doc.tasks.map((task, i) => {
                    let newTask = TaskModel({
                        from: task.from,
                        name: task.name,
                        sprintNum: task.sprintNum,
                        started: task.started
                    })

                    newTask.save(function (err) {
                        container.tasks.push(newTask)

                        if (container.tasks.length == num2) {
                            container.save((err) => {
                                if (err) return handleError(err);
                            });
                        }
                    })
                })
                if (newProject.taskContainers.length == num1) {
                    newProject.save((err) => {
                        if (err) return handleError(err);
                    });
                }
            });
        })
    })
})

// print in console of project all the containers.
app.get('/allContainers', (req, res) => {
    ContainersModel.find({}).
        populate('ContainersModel').
        exec(function (err, containers) {
            // console.log(containers);
            containers.map((cont, i) => {
                // console.log(cont._id);
                ContainersModel.findById(cont._id, (err, task) => {
                })
            })
            res.json(containers)
        })
})
// print in console of project all the tasks.
app.get('/allTasks', (req, res) => {
    TaskModel.find({}).
        populate('task').
        exec(function (err, task) {
            res.json(task)
        })
})

// update in one task if started.
app.put('/', (req, res) => {
    res.send('update start');
    ProjectModel.findOne({ name: 'project1' }).
        populate('taskContainers').
        exec((err, pro) => {
            pro.taskContainers.map((cont, i) => {
                getTasks(cont);
            })
        })
})

function getTasks(cont) {
    ContainersModel.findById(cont._id).populate('tasks').
        exec((err, task) => {
            // console.log(task.tasks);
            task.tasks.map((t, index) => {
                // console.log(t.name);
                if (t.name === 'task7') {
                    console.log(t);
                    t.started = true;
                    t.save((err) => {
                        console.log('done');
                    })
                }
            })
        })
}


app.delete('/projects', (req, res) => {
    res.send('deleted')
    ProjectModel.remove({}, (err) => {
        console.log("all data of projects deleted");
    })
})
app.delete('/containers', (req, res) => {
    res.send('deleted')
    ContainersModel.remove({}, (err) => {
        console.log("all data of containers deleted");
    })
})
app.delete('/tasks', (req, res) => {
    res.send('deleted')
    TaskModel.remove({}, (err) => {
        console.log("all data of tasks deleted");
    })
})

app.delete('/deleteTasks', (req, res) => {
    res.send('start to remove one task')
    ProjectModel.findOne({ name: 'project1' }).
        populate('taskContainers').
        exec((err, pro) => {
            pro.taskContainers.map((cont, i) => {
                // console.log(cont);
                ContainersModel.findById(cont._id).populate('tasks').
                    exec((err, task) => {
                        // console.log(task.tasks);
                        task.tasks.map((t, index) => {
                            // console.log(t.name);
                            if (t.name === 'task7') {
                                
                                t.remove((err) => {
                                    console.log('done');
                                })
                                ContainersModel.findOne({_id:t._id},(err, c) => {
                                    console.log(c);
                                    
                                })
                            }
                        })
                    })
            })
        })
})

app.listen(3030);

