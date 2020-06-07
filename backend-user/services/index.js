// Import all the users models
const { Users, Accidents } = require('../models/index');

// Import all the service constructors
const UserService = require('./UserService');
const AccidentService = require('./AccidentService');
const RecordService = require('./RecordService')

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


const recordService = new RecordService({
	db: {
		accidents: Accidents,
	},
	services: {},
});

// Export the service object
module.exports = {
	userService,
	accidentService,
	recordService
};
