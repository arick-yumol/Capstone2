const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email address is required."]
	},
	password: {
		type: String,
		required: [true, "Password is required."]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	orderList: [
		{
			productId: {
				type: String,
				required: [true, "orderId is required."]
			},
			orderDate: {
				type: Date,
				default: new Date()
			}
		}
	]
});

module.exports = mongoose.model("User", userSchema);