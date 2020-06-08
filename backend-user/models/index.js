const Users = require('./user/index');
const userValidationSchema = require('./user/validator');
const Accidents = require('./accident');
const accidentValidationSchema = require('./accident/validator');


module.exports = {
	Users,
	userValidationSchema,
	Accidents,
	accidentValidationSchema,
};
