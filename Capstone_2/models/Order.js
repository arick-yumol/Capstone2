const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	totalAmount: {
		type: String,
		required: [true, "Total amount is required."]
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	},
	orderList: [
		{
			userId: {
			type: String,
			required: [true, "userId is required."]
			},
			productId: {
				type: String,
				required: [true, "productId is required."]
			}
		}
	]
});

module.exports = mongoose.model("Order", orderSchema);