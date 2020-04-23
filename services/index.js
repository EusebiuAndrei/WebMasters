// Import all the users models
const { Users } = require('../models/index');

// Import all the service constructors
const UserService = require('./UserService');

// Create the service objects with dependencies
const userService = new UserService({
	db: {
		users: Users,
	},
	services: {},
});

// Export the service object
module.exports = {
	userService,
};
