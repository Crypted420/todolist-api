const express = require('express');
const UserModel = require('../models/users.model');
const TodoModel = require('../models/todo.model');
const jwt = require('jsonwebtoken')

exports.get_user_data = (req, res) => {

    TodoModel.find({ user_id: req.data.id }, (err, result) => {
        if (err) throw err;
        else if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(200).json({ message: 'Todo list empty' })
        }
    })
}

exports.add_todo = (req, res) => {
    const { todo } = req.body

    const new_todo = new TodoModel({
        todo: todo,
        user_id: req.data.id
    })

    new_todo.save(err => {
        if (err) res.sendStatus(500);
        else {
            res.status(200).json('todo created')
        }
    })
}

exports.update_todo_check = (req, res) => {
    const { todo_id, check } = req.query;

    if (check == 'true') {
        TodoModel.findById(todo_id, (err, result) => {
            if (err) res.sendStatus(500);
            else if (result) {
                TodoModel.findByIdAndUpdate(todo_id, { done: true }, (err) => {
                    if (err) res.sendStatus(500);
                    else {
                        res.status(200).json('Updated successfully')
                    }
                })
            }
            else {
                res.sendStatus(404)
            }
        })
    }
    else if (check == 'false') {
        TodoModel.findById(todo_id, (err, result) => {
            if (err) res.sendStatus(500);
            else if (result) {
                TodoModel.findByIdAndUpdate(todo_id, { done: false }, (err) => {
                    if (err) res.sendStatus(500);
                    else {
                        res.status(200).json('Updated successfully')
                    }
                })
            }
            else {
                res.sendStatus(404)
            }
        })

    }
}

exports.delete_todo = (req, res) => {
    const { todo_id } = req.query;

    TodoModel.findById(todo_id, (err, result) => {
        if (err) res.sendStatus(500);
        else if (result) {
            TodoModel.findByIdAndDelete(todo_id, (err) => {
                if (err) res.sendStatus(500);
                else {
                    res.status(200).json('Deleted successfully')
                }
            })
        }
    })

}

module.exports