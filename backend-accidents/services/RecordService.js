const fetch = require('node-fetch');
const { recordDataRequestSchema } = require('../schemas');
const { recordData } = require('../models/accident/validator');

class RecordService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}

	async getData(payloadString) {
		let payload;
		try {
			payload = JSON.parse(decodeURIComponent(payloadString));
		} catch (e) {
			if (e instanceof SyntaxError) {
				return {
					success: false,
					error: {
						message:
							"'query' parameter does not contain valid URI-encoded JSON string",
					},
				};
			}
		}
		try {
			const {
				error,
				data,
			} = await recordDataRequestSchema.validate(payload);
			const { orderBy } = payload;
			const { skip, limit } = payload;

			const filter = payload.filters ? payload.filters : [];

			const queryFilters = filter.map((filter) => {
				return {
					[filter.column]: {
						[`$${filter.constraint}`]: filter.value,
					},
				};
			});

			// console.log(JSON.stringify({$and: [...queryFilters]}, null, 2));
			// console.log();

			const accidents = await this.db.accidents
				.find({
					$and: [...queryFilters],
				})
				.sort({ [orderBy.column]: orderBy.order })
				.limit(limit)
				.skip(skip);
			// console.log(accidents);

			return {
				success: true,
				data: { accidents },
			};
		} catch (error) {
			console.log(error);

			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async getAccidentById(query, bearerToken) {
		try {
			await authorize(bearerToken);

			const { id } = query;

			console.log(id);
			const accident = await this.db.accidents.findOne({
				_id: id,
			});

			if (accident == null) {
				throw new Error('Not found!');
			}

			return {
				success: true,
				data: { accident },
			};
		} catch (error) {
			console.log(error);

			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async deleteAccidentById(query, bearerToken) {
		try {
			await authorize(bearerToken);
			const { id } = query;
			console.log(id);
			const accident = await this.db.accidents.deleteOne({
				_id: id,
			});

			return {
				success: true,
				//data :  {accident}
			};
		} catch (error) {
			console.log(error);

			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async updateAccidentById(query, payload, bearerToken) {
		try {
			await authorize(bearerToken);
			//   console.log(payload);
			const { id } = query;
			//   console.log(id);
			const updated = await this.db.accidents.findOneAndUpdate(
				{ _id: id },
				payload,
			);

			return {
				success: true,
				data: { updated },
			};
		} catch (error) {
			console.log(error);

			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async addAccident(payload, bearerToken) {
		try {
			await authorize(bearerToken);
			//validate the schema
			// const {error, data} = await recordData.validate(payload);
			const accident = new this.db.accidents(payload);

			await accident.save();

			return {
				success: true,
				data: { accident },
			};
		} catch (error) {
			console.log(error);

			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	// fds
}

async function authorize(bearerToken) {
	let response = await fetch(
		'http://localhost:3001/api/users/auth',
		{
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		},
	);

	response = await response.json();
	// console.log(response);
	if (response.success === false) {
		throw new Error(response.error.message);
	}
}

module.exports = RecordService;
