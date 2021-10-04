const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');
const auth = require('../auth');

// Order creation
router.post('/create', auth.verify, (req, res) => {
	let orderData = {
		totalAmount: req.body.totalAmount,
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
	}
	
	orderController.createOrder(orderData).then(result => res.send(result));
})

// Order retrieval (ADMIN)
router.get('/all', auth.verify, (req, res) => {
	orderController.getAllOrders().then(result => res.send(result));
})

// Order retrieval (USER)
router.get('/cart', auth.verify, (req, res) => {
	const userAuthority = {
		isAdmin: auth.decode(req.headers.authorization).id
	}
	if (userAuthority) {
		orderController.getMyOrder().then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin.");
		res.send(false);
	}
})

module.exports = router;