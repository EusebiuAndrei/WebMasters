const jwt = require('jsonwebtoken');
const Logger = require('../loaders/logger');
const config = require('../config');

class UserService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}

	async getAllUsers() {
		try {
			const users = await this.db.users.find({});

			return { success: true, data: { users } };
		} catch (error) {
			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async register(payload) {
		const { email, password } = payload;
		const userData = { email, password };
		const user = new this.db.users(userData);

		try {
			await user.save();
			await user.generateAuthToken();
			return { success: true, data: { user, token } };
		} catch (error) {
			Logger.error(error);
			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async authorize(bareartoken) {
		try {
			const token = bareartoken.replace('Bearer ', '');
			// console.log(token);
			const { _id } = jwt.verify(token, config.jwtSecret);
			const user = await this.db.users.find({
				_id,
				'tokens.token': token,
			});

			if (!user) {
				throw new Error('Not authorized');
			}

			return { success: true, data: {} };
		} catch (error) {
			return {
				success: false,
				error: { message: 'Not authorized' },
			};
		}
	}
}

module.exports = UserService;
