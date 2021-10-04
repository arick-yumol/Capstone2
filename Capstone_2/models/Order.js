const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderedBy: [
		{
			userId: {
				type: String,
				required: [true, "userId is required."]
			}
			/*email: {
				type: String,
				required: [true, "E-mail is required."]
			}*/
		}
	],
	productsOrdered: [
		{

			productId: {
				type: String,
				required: [true, "productId is required."]
			},
			/*name: {
				type: String,
				required: [true, "Name is required."]
			},*/
			totalAmount: {
				type: Number,
				required: [true, "Total amount is required."]
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			}
		}
	]
});

module.exports = mongoose.model("Order", orderSchema);