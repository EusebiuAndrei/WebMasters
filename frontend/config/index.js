const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
	// This error should crash whole process

	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
module.exports = {
	port: parseInt(process.env.PORT, 10),
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},
};
