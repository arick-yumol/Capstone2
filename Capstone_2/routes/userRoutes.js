const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../auth');

// User registration
router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(result => res.send(result));
})

// User authentication
router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(result => res.send(result));
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
		console.log("Invalid command! User is not an admin!");
		res.send(false);
	}
})

// User order checkout
router.post('/checkout', auth.verify, (req, res) => {
	let orderData = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId
	}

	userController.orderCheckout(orderData).then(result => res.send(result));
})

// All user orders retrieval
router.get('/orders', auth.verify, (req, res) => {
	const userAuthority = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	let orderData = {
		orderList: req.body.orderList
	}

	if (userAuthority) {
		userController.getAllOrders(orderData).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin!");
		res.send(false);
	}
})

// User order retrieval
router.get('/:userId/cart', auth.verify, (req, res) => {
	const userData = {
		userId: auth.decode(req.headers.authorization).id,
	}

	if (userData) {
		userController.getOrder(userData).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User not authenticated!");
		res.send(false);
	}
})



// User registration checker (OPTIONAL)
router.post('/checker', (req, res) => {
	userController.checkUserRegistration(req.body).then(result => res.send(result));
})

// User profiles identification  (OPTIONAL)
router.get('/profiles', auth.verify, (req, res) => {
	const userAuthority = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (userAuthority) {
		userController.userProfiles(req.body).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin!");
		res.send(false);
	}
})

// User specific profile identification (OPTIONAL)
router.get("/:userId/profile", (req,res)=>{
	const userData = {
		userId: auth.decode(req.headers.authorization).id
	}

	if (userData) {
		userController.userProfile(userData).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User not authenticated!");
		res.send(false);
	}
})
/*router.get("/:userId", (req,res)=>{
	userController.userProfile(req.params).then(result => res.send(result));
})*/

module.exports = router;