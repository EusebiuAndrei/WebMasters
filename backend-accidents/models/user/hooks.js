const bcrypt = require('bcryptjs');
const Logger = require('../../loaders/logger');

module.exports = (schema) => {
	// Add hooks here a.k.a. mongoose middlewares
	schema.pre('save', async function (next) {
		const user = this;

		if (user.isModified('password')) {
			try {
				user.password = await bcrypt.hash(user.password, 8);
			} catch (error) {
				Logger.error(error);
				throw new Error('Problem while crypting');
			}
		}

		next();
	});
};
