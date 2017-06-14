const express = require('express');
const router = express.Router();

const mongojs = require('mongojs');
const db = mongojs('tasksdb', [
    'tasks'
]);

// Get All Tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if(err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get a single
router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},
    (err, task) => {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Save a Task
router.post('/tasks', (req, res, next) => {
    var task = req.body;
    console.log(task);
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete a task
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},
    (err, task) => {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Update a task
router.put('/tasks/:id', (req, res, next) => {
    var task = req.body;
    var updatedTask = {};

    if(task.isDone) {
        updatedTask.isDone = task.isDone;
    }
    if(task.title) {
        updatedTask.title = task.title;
    }
    if(!updatedTask) {
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},
        updatedTask,
        (err, task) => {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;
