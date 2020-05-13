// Import all the users models
const { Users, Accidents } = require('../models/index');

// Import all the service constructors
const UserService = require('./UserService');
const AccidentService = require('./AccidentService');

// Create the service objects with dependencies
const userService = new UserService({
	db: {
		users: Users,
	},
	services: {},
});

const accidentService = new AccidentService({
	db: {
		accidents: Accidents,
	},
	services: {},
});


// Export the service object
module.exports = {
	userService,
	accidentService
};
