const { Joi } = require('celebrate');
const { discreteColumns, numericColumns, columns } = require('./columns');

const schema = Joi.object()
	.required()
	.keys({
		bucketType: Joi.string().valid('time', 'column').required(),
		bucketColumn: Joi.string().valid(...discreteColumns),
		joinBucketsPast: Joi.number().integer().min(1),
		valueType: Joi.alternatives()
			.required()
			.try(
				Joi.string().valid('count'),
				Joi.object().keys({
					column: Joi.string().valid(...numericColumns),
					type: Joi.string().valid('min', 'max', 'avg'),
				}),
			),
		timeChart: {
			bucketSize: Joi.string().valid('day', 'week', 'month', 'year').required(),
			from: Joi.date(),
			to: Joi.date().min(Joi.ref('from')),
			timeAxisBasedOn: Joi.string().valid('start', 'end').default('start'),
		},
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
