const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../auth');
const bcrypt = require('bcrypt');

// User registration
module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10)
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

// User existence checker
module.exports.checkUserExistence = (reqBody) => {
	return User.find( { email: reqBody.email } ).then(result => {
		if (result.length > 0) {
			console.log("User exists.");
			return true;
		}
		else {
			console.log("User does not exist.");
			return false;
		}
	})
}

// User authentication
module.exports.loginUser = (reqBody) => {
	return User.findOne( {email: reqBody.email} ).then(result => {
		if (result == null) {
			console.log("User does not exist.");
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

