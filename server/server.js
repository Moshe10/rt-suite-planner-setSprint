// my ip = 10.2.2.108
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const AllProjectModel = require('./models/AllprojectSchema');

var mongoPath = 'mongodb://127.0.0.1/rt';

mongoose.connect(mongoPath, { useNewUrlParser: true });
var mongooseDb = mongoose.connection;

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// create the all project in mongoose. 
app.post('/createProject', (req, res) => {
    console.log("create project in server POST");
    
    let newProject = new AllProjectModel({
        name: req.body.projectName,
        sprintLength: req.body.project.sprintLength,
        developers: req.body.project.developers,
        startDate: req.body.project.startDate,
        taskContainers: req.body.project.containers,
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
app.get('/getAllProject/:proName', (req, res) => {
    let proName = req.params.proName;
    AllProjectModel.find({name:proName}, (err, project) => {
        res.json(project)
    })
})


app.get('/GetBringAnExistingProject/:proName', (req, res) => {
    console.log("server get the post:'PostBringAnExistingProject' ");
    let proName = req.params.proName;
    
    AllProjectModel.find({name:proName}, (err, project) => {
        if (!err) {
            res.json(project)
        }
        else {
            res.send(err)
        }
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
    console.log(req.body);
    projectId = req.body.id;   
    fatherIndex = req.body.fatherIndex;
    taskIndex = req.body. taskIndex;
    sprintNum = req.body.sprintNum;
    AllProjectModel.findById(projectId, function (err, project) {
        if (err) return handleError(err);
        project.taskContainers[fatherIndex].tasks[ taskIndex].sprintNum = sprintNum;
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
        project.startDate = req.body.startDate;
        project.save((err, project) => {
            
        })
      });
}))


app.put('/lockSprint', ((req, res) => {
    res.send("start lock sprint");
    id = req.body.projectId;
    taskContainers = req.body.taskContainers;
    AllProjectModel.findById(id, function (err, project) {
        if (err) return handleError(err);
        project.taskContainers = taskContainers;
        project.save((err, project) => {
            
        })
      });
}))

app.put('/updateDevForCont', ((req, res) => {
    AllProjectModel.findById(req.body.proId, (err, project) => {
        
        if(!err) {

            if (req.body.bool) {
                req.body.bool.busy = true;
                project.taskContainers[req.body.index].developers.push(req.body.developer);
                project.save((err) => {
                    if (!err) {
                        res.send('developer added');
                    } else {
                        res.send(err);
                    }
                });
            }
            if (!req.body.bool) {
                project.taskContainers[req.body.index].developers.map((dev,i) => {
                    if(dev.id === req.body.developer.id ){
                        req.body.developer.busy = false;
                        project.taskContainers[req.body.index].developers.splice(i,1);
                        project.save((err) => {
                            if (!err) {
                                res.send('developer added');
                            } else {
                                res.send(err);
                            }
                        });
                    }
                })
            }
        }
        else {
            res.send(err);
        }
    })
}))


app.listen(3030);






