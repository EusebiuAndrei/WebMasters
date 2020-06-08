const { Joi } = require('celebrate');
const { columns } = require('./columns');


const schema = Joi.object().keys({
	orderBy: Joi.object().keys({
		column: Joi.string().valid(...columns).default('startTime'),
		order: Joi.string().valid('asc', 'desc').default('asc'),
	}),
	skip: Joi.number().integer().positive(),
	limit: Joi.number().integer().positive().max(20).default(10),
	columns: Joi.array().items(
		Joi.string().valid(...columns),
	),
	filters: Joi.array().items(
		Joi.alternatives().try(
			Joi.object().keys({
				column: Joi.string().valid(...columns),
				constraint: Joi.string().valid('in'),
				value: Joi.array(),
			}),
			Joi.object().keys({
				column: Joi.string().valid(...columns),
				constraint: Joi.string().valid('ne', 'lte', 'gte', 'lt', 'gt'),
				value: Joi.any(),
			}),
		),
	),
});

module.exports = schema;