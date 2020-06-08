// Import all the users models
const { Accidents } = require('../models/index');

// Import all the service constructors
const AccidentService = require('./AccidentService');
const RecordService = require('./RecordService');

// Create the service objects with dependencies

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
	accidentService,
	recordService,
};
