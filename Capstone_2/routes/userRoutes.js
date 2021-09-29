const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../auth');

// User registration
router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(result => res.send(result));
})

// User existence checker (OPTIONAL)
router.post('/checkExistence', (req, res) => {
	userController.checkUserExistence(req.body).then(result => res.send(result));
})

// User authentication
router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(result => res.send(result));
})

// Users' profile identification  (OPTIONAL)
router.get('/profiles', auth.verify, (req, res) => {
	const userAuthority = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (userAuthority) {
		userController.userProfiles(req.body).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin.");
		res.send(false);
	}
})

/*// User specific identification (OPTIONAL)
router.get('/:userId/profile', auth.verify, (req, res) => {
	const userAuthority = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (userAuthority) {
		userController.userProfile(req.params).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin.")
		res.send(false)
	}
})*/
router.get("/:userId", (req,res)=>{
	userController.userProfile(req.params).then(result => res.send(result));
})

// User admin setup
router.put('/:userId/setAsAdmin', auth.verify, (req, res) => {
	const userAuthority = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (userAuthority.isAdmin) {
		userController.setUserAsAdmin(req.params, req.body).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin.");
		res.send(false);
	}
})

// Admin profiles (OPTIONAL)	(UnhandledPromiseRejectionWarning: CastError: Cast to ObjectId failed for value "admins" )
router.get('/admins', auth.verify, (req, res) => {
	const userAuthority = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (userAuthority) {
		userController.adminProfiles(req.body).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin.");
		res.send(false);
	}
})

// User order checkout
router.post('/checkout', auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)
})

module.exports = router;