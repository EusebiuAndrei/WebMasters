const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			min: 10,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		name: {
			type: String,
			//	required: true,
			min: 5,
		},
		// role: {
		// 	type: String,
		// 	enum: ['Client', 'Provider'],
		// 	default: 'Provider',
		// },
		emailToken: {
			type: String,
		},
		confirmed: {
			type: Boolean,
			required: true,
			default: 'true',
		},
		tokens: [
			{
				token: {
					type: String,
				},
			},
		],
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

module.exports = userSchema;
