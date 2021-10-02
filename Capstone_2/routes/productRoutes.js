const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const auth = require('../auth');

// Product addition
router.post('/add', auth.verify, (req, res) => {
	const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		productController.addProduct(data).then(result => res.send(result));
	} 
	else {
		console.log("Invalid command! User is not an admin.")
		res.send(false)
	}
})

// Product retrieval (ALL)
router.get('/all', (req, res) => {
	productController.getAllProducts().then(result => res.send(result));
})

// Product retrieval (SPECIFIC by productID)
router.get('/:id', (req, res) => {
	productController.getSpecificProduct(req.params.id).then(result => res.send(result));
})

// Product update
router.put('/:productId/update', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		productController.updateProduct(req.params, req.body).then(result => res.send(result));
	} 
	else {
		console.log("Invalid command! User is not an admin.")
		res.send(false)
	}
})

// Product archive
router.put('/:productId/archive', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		productController.archiveProduct(req.params, req.body).then(result => res.send(result));
	}
	else {
		console.log("Invalid command! User is not an admin.")
		res.send(false)
	}
})

module.exports = router;