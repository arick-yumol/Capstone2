const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const auth = require('../auth');

// Product addition
router.post('/', auth.verify, (req, res) => {
	const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	productController.addProduct(data).then(result => res.send(result));
})

// Product retrieval (ALL)
router.get('/all', (req, res) => {
	productController.getAllProducts().then(result => res.send(result));
})

// Product retrieval (SPECIFIC by productID)
router.get('/:id', (req, res) => {
	productController.getSpecificProduct(req.params.id).then(result => res.send(result));
})



module.exports = router;