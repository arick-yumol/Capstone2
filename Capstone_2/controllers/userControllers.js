const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../auth');
const bcrypt = require('bcrypt');

// User registration
module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10),
		isAdmin: reqBody.isAdmin
	})

	return newUser.save().then((user, error) => {
		if (error) {
			console.log(error);
			return false;
		}
		else {
			console.log("User has been successfully created!");
			return true;
		}
	})
}

// User authentication
module.exports.loginUser = (reqBody) => {
	return User.findOne( {email: reqBody.email} ).then(result => {
		if (result == null) {
			console.log("User does not exist!");
			return false;
		}
		else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if (isPasswordCorrect) {
				return { accessToken: auth.createAccessToken(result.toObject()) }
			}
			else {
				console.log("Error! Password do not match!");
				return false;
			}
		}
	})
}

// User admin setup
module.exports.setUserAsAdmin = (reqParams, reqBody) => {
	let updateUserStatus = {
		isAdmin: true
	}

	return User.findByIdAndUpdate(reqParams.userId, updateUserStatus).then((user, error) => {
		if (error) {
			console.log("Error! User status update unsuccessful!");
			return false;
		} 
		else {
			console.log("Updated user as an admin!")
			return true;
		}
	})
}

// User order checkout
module.exports.orderCheckout = async (data) => {
	let isUserUpdated = await User.findById(data.userId).then(user => {
		user.orderList.push( { productId: data.productId } )

		return user.save().then((user, error) => {
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

	let isProductUpdated = await Product.findById(data.productId).then(product => {
		product.orderedBy.push( { userId: data.userId } )
		
		return product.save().then((product, error) => {
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

	/*let isOrderUpdated = await Order.findById(data.orderId).then(order => 
		{
			order.orderedBy.push(
				{
					userId: data.userId,
					userName: data.userName
				}
			),
			order.productOrdered.push(
				{
					productId: data.productId,
					productName: data.productName
				}
			)
		}
	)*/

	if (isUserUpdated && isProductUpdated) {
		console.log("User and product documents have been successfully updated!")
		return true;
	}
	else {
		console.log("User and product documents update failed!")
		return false;
	}
}

// All user orders retrieval
module.exports.getAllOrders = () => {
	return User.find( {isAdmin: false} ).then((result, error) => {
		if (error) {
			console.log("Error! Unable to retrieve all orders!")
			return false;
		}
		else {
			console.log("Retrieved all orders!")
			return result;
		}
	})
}

// User order retrieval
module.exports.getOrder = (data) => {
	return User.findById(data.userId).then((result, error) => {
		if (error) {
			console.log("Error! Retrieval of user's order is unsuccessful!")
			return false;
		}
		else {
			console.log("User's order has been retrieved successfully!")
			return result.orderList;
		}
	})
}



// User registration checker (OPTIONAL)
module.exports.checkUserRegistration = (reqBody) => {
	return User.find( { email: reqBody.email } ).then(result => {
		if (result.length > 0) {
			console.log("User exists!");
			return true;
		}
		else {
			console.log("User does not exist!");
			return false;
		}
	})
}

// User profiles identification  (OPTIONAL)
module.exports.userProfiles = () => {
	return User.find( {} ).then((result, error) => {
		if (error) {
			console.log("Error! User profiles retrieved unsuccessfully!")
			return false;
		}
		else {
			console.log("All user profiles retrieved successfully!")
			return result;
		}
	})
}

// User specific profile identification (OPTIONAL)
module.exports.userProfile = (data) => {
	return User.findById(data.userId).then((result, error) => {
		result.password = "";

		if (error) {
			console.log("Error!");
			return false;
		}
		else {
			console.log("User details retrieved.")
			return result;
		}
	})
}
/*module.exports.userProfile = (reqParams) =>{
	return User.findById(reqParams.userId).then(result => {
		result.password = "";
		return result;
	})
}*/