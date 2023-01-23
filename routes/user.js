var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');
const jwt = require('jsonwebtoken')

// Fetch all todo list of user
router.get('/', checkExistingToken, UserController.get_user_data)

//Update user todo list with the method PUT
router.put('/', checkExistingToken, UserController.add_todo)

// Update a todo-list with a query of todo_id and check added to the url
router.post('/', checkExistingToken, UserController.update_todo_check)

// Delete a todo-list with the method DELETE and query todo_id added to the url
router.delete('/', checkExistingToken, UserController.delete_todo)


// Check each request if token is still valid
function checkExistingToken(req, res, next) {
    const { token } = req.cookies;
    console.log(token);
    if (token !== ' ') {
        jwt.verify(token, 'secretkey', (err, result) => {
            if (err) res.sendStatus(401);
            else {
                req.data = result;
                next();
            }
        })
    }
    else {
        res.sendStatus(403);
    }
}

module.exports = router;
