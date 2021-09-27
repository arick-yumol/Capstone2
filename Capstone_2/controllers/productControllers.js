const Product = require('../models/Product');

// Product addition
module.exports.addProduct = (reqBody) => {
	if (reqBody.isAdmin) {
		let newProduct = new Product({
			name: reqBody.product.name,
			description: reqBody.product.description,
			price: reqBody.product.price
		})

		return newProduct.save().then((product, error) => {
			if (error) {
				console.log("Error encountered!");
				return false;
			}
			else {
				console.log("Admin has added a product");
				return true;
			}
		})
	}
	else {
		console.log("Error! User is not an admin");
		return false;
	}

}

// Product retrieval (ALL)
module.exports.getAllProducts = () => {
	return Product.find( {} ).then((result, error) => {
		if (error) {
			console.log("Error encountered!");
			return false;
		}
		else {
			if (result < 0) {	// fix how to show in console when product directory is empty
				console.log("No products added.")
			}
			else {
				console.log("All products have been retrieved.");
			}
			return result;
		}
	})
}

// Product retrieval (SPECIFIC by productID)
module.exports.getSpecificProduct = (productId) => {
	return Product.findById(productId).then((result, error) => {
		if (error) {
			console.log("Error encountered!");
			return false;
		}
		else {
			console.log("Product has been retrieved.");
			return result;
		}
	})
}