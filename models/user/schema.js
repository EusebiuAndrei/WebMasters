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
