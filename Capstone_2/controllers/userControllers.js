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

// User existence checker (OPTIONAL)
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

// Users' profile identification  (OPTIONAL)
module.exports.userProfiles = () => {
	return User.find( { isAdmin: false } ).then(result => {
		return result;
	})
}

/*// User specific identification (OPTIONAL)
module.exports.userProfile = (reqParams) => {
	return User.findById(reqParams.userId).then((result, error) => {
		if (error) {
			console.log("Error!");
			return false;
		}
		else {
			console.log("User details retrieved.")
			result.password = "";
			return result;
		}
	})
}*/
module.exports.userProfile = (reqParams) =>{
	return User.findById(reqParams.userId).then(result => {
		result.password = "";
		return result;
	})
}

// User admin setup
module.exports.setUserAsAdmin = (reqParams, reqBody) => {
	let updateUserStatus = {
		isAdmin: true
	}

	return User.findByIdAndUpdate(reqParams.userId, updateUserStatus).then((user, error) => {
		if (error) {
			console.log("Error! User status update unsuccessful.");
			return false;
		} 
		else {
			console.log("Updated user as an admin.")
			return true;
		}
	})
}

// Admin profiles (OPTIONAL)
module.exports.adminProfiles = () => {
	return User.find( { isAdmin: true } ).then(result => {
		return result;
	})
}