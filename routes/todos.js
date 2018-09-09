const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
let Todo = mongoose.model('Todo');

router.post('/', (req, res) => {
    let newTodo = new Todo();
    newTodo.description = req.body.description;
    newTodo.save((err) => {
        if(err) {
            res.send(err)
        } else {
            res.end()
        }
    })
})

router.get('/', (req, res) => {
    Todo.find({}).then((orders) => {
        res.json(orders)
    })
})

router.put('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            res.send(err)
        } else {
            todo.description = req.body.description;
            todo.save((err) => {
                if(err) {
                    res.send(err)
                } else {
                    res.end()
                }
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    Todo.deleteOne({_id: req.params.id}, (err) => {
        if(err) {
            res.send(err)
        } else {
            res.end()
        }
    })
})

module.exports = router;