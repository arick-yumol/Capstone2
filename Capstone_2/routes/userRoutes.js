const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../auth');

// User registration
router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(result => res.send(result));
})

// User existence checker
router.post('/checkExistence', (req, res) => {
	userController.checkUserExistence(req.body).then(result => res.send(result));
})

// User authentication
router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(result => res.send(result));
})


module.exports = router;