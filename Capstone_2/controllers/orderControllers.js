const Product = require('../models/Product');
const Order = require('../models/Order');

// Order creation
/*module.exports.createOrder = (reqBody) => {
	let userOrder = new Order({
		totalAmount: reqBody.order.totalAmount,
		orderedBy: [
			{
				userId: reqBody.order.userId,
				email: reqBody.order.email
			}
		],
		productsOrdered: [
			{
				productId: reqBody.order.productId,
				name: reqBody.order.name
			}
		]
	})
}*/
module.exports.createOrder = async (data) => {
	let isUserUpdated = await Order.findById(data.orderId).then(user => {
		order.orderedBy.push( { userId: data.userId } )

		return order.save().then((user, error) => {
			if (error) {
				console.log("Error!");
				return false;
			}
			else {
				console.log("Success!");
				return true;
			}
		})
	})

	let isProductUpdated = await Order.findById(data.orderId).then(product => {
		order.productsOrdered.push( { productId: data.productId } )

		return order.save().then((product, error) => {
			if (error) {
				console.log("Error!");
				return false;
			}
			else {
				console.log("Success!");
				return true;
			}
		})
	})

	if (isUserUpdated && isProductUpdated) {
		console.log("User and product documents have been successfully updated!")
		return true;
	}
	else {
		console.log("User and product documents update failed!")
		return false;
	}
}

// Order retrieval (ADMIN)
module.exports.getAllOrders = () => {
	return Order.find({}).then(result => {
		return result;
	})
}

// Order retrieval (USER)
module.exports.getMyOrder = (userId) => {
	return Order.findById(userId).then((result, error) => {
		if (error) {
			console.log("Error! Order retrieval unsuccessful!");
			return false;
		}
		else {
			console.log("User's order has been retrieved successfully!");
			return result;
		}
	})
}