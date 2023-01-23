const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users.model');
const cryptPassword = require('../utils/hash.password');

exports.login = (req, res) => {
    const { password, email } = req.body;

    UsersModel.findOne({ email }, (err, result) => {
        if (err) res.sendStatus(500);
        else if (result) {
            if (cryptPassword.cryptPassword(password) == result.password) {
                jwt.sign({ id: result._id }, 'secretkey', { expiresIn: "30m" }, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).status(200).json({ message: 'login successfull' });
                })
            }
            else {
                res.json('Wrong password')
            }
        }
        else {
            res.json('user not found')
        }
    })
}
exports.register_user = (req, res) => {
    const { email, password } = req.body;
    const new_user = new UsersModel({
        email: email,
        password: cryptPassword.cryptPassword(password)
    })

    UsersModel.findOne({ email }, (err, result) => {
        if (err) res.status(500).json('Server error');
        else if (result) {
            res.status(409).json('Email already exist')
        }
        else {
            new_user.save((err) => {
                if (err) res.json(err)
                res.status(200).json('Account created!')
            })
        }

    })
}

module.exports