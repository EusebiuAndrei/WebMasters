const Logger = require('../loaders/logger');

class AccidentService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}
}

module.exports = AccidentService;
