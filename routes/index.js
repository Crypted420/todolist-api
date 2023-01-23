var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/auth.controller')
const jwt = require('jsonwebtoken');

router.post('/login', AuthController.login);

router.post('/register', AuthController.register_user);

router.post('/logout', (req, res) => {
  req.clearCookie('token');
  res.status(200).json('logout successfull')
});

module.exports = router;
