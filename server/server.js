// my ip = 10.2.2.108
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const AllProjectModel = require('./models/AllprojectSchema');

var mongoPath = 'mongodb://127.0.0.1/rt-suite-planner';

mongoose.connect(mongoPath, { useNewUrlParser: true });
var mongooseDb = mongoose.connection;

const app = express();

app.use(bodyParser.json());


// create the all project in mongoose. 
app.post('/createProject', (req, res) => {
    console.log("create project in server POST");
    
    let newProject = new AllProjectModel({
        name: req.body.name,
        sprintLength:req.body.sprintLength,
        developers: req.body.developers,
        taskContainers:req.body.containers,
    })

    newProject.save(function (err, newProject) {
        if (!err) {
            res.send('new project created');
        } else {
            res.send(err);
        }
    });
})

// get to the client side the all project.
app.get('/getAllProject', (req, res) => {
    AllProjectModel.find({}, (err, project) => {
        res.json(project)
    })
})

app.put('/updateWeekOfTaskContainer',((req, res) => {
    id = req.body.id;
    index = req.body.contIndex;
    week = req.body.contWeek;
    AllProjectModel.findById(id, (err, project) => {
        if (!err){
            project.taskContainers[index].week = week;
        }
        project.save((err) => {
            if(!err){
                res.send('taskContainer week updated')
            }
            else{
                res.send(err)
            }
        });
    })
}));

app.put('/updateSprintNumInTask', ((req, res) => {
    res.send("start update sprint number");
    // console.log(req.body);
    projectId = req.body.id;   
    fatherIndex = req.body.fatherIndex;
    index = req.body.index;
    sprintNum = req.body.sprintNum;
    AllProjectModel.findById(projectId, function (err, project) {
        if (err) return handleError(err);
        project.taskContainers[fatherIndex].tasks[index].sprintNum = sprintNum;
        project.save((err, project) => {
            
        })
      });
}))

app.put('/updateResolution&date&SprintLength', ((req, res) => {
    res.send('start update sprint length, start project date, and resolution of sprint');
    id = req.body.project_id;
    AllProjectModel.findById(id, function (err, project) {
        if (err) return handleError(err);
        // console.log(project);
        project.resolution = req.body.resolution;
        project.sprintLength = req.body.sprintLength;
        project.save((err, project) => {
            
        })
      });
}))


app.put('/lockSprint', ((req, res) => {
    res.send("start lock sprint");
    // console.log(req.body);
    id = req.body.projectId;
    taskContainers = req.body.taskContainers;
    AllProjectModel.findById(id, function (err, project) {
        if (err) return handleError(err);
        project.taskContainers = taskContainers;
        project.save((err, project) => {
            
        })
      });
}))


app.listen(3030);






