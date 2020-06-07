const mongooseLoader = require('./mongoose');
const Logger = require('./logger');

require('../api');

module.exports = async () => {
	try {
		await mongooseLoader();
		Logger.info('✌️ DB loaded and connected!');
	} catch (error) {
		Logger.error(error);
	}
};
