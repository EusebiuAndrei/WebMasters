const { Joi } = require('celebrate');
// const joiObjectId = require('joi-objectid');

// // add joi-objectId to Joi
// Joi.objectId = joiObjectId(Joi);

const schema = Joi.object().keys({
	email: Joi.string()
		.email()
		.required()
		.error(new Error('Email required')),
	password: Joi.string()
		.min(6)
		.required()
		.error(
			new Error(
				'Password must consist of minimum 6 characters',
			),
		),
});

module.exports = schema;
