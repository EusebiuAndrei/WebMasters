const bcrypt = require('bcryptjs');

// Create functions that will represent schema statics
const findByCredentials = async function (email, password) {
	const user = await this.findOne({ email });

	if (!user) {
		throw new Error('Unable to login');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
};

module.exports = {
	// Put them all here
	findByCredentials,
};
