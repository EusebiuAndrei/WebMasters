const jwt = require('jsonwebtoken');
const config = require('../../config/index');

// Create functions that will represent schema methods
const generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		config.jwtSecret,
	);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

const toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

module.exports = {
	// Put them all here
	generateAuthToken,
	toJSON,
};
