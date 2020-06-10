const fetch = require('node-fetch');
const { recordDataRequestSchema } = require('../schemas');
const recordData = require('../models/accident/validator');
const recordUpdate = require('../models/accident/validatorUpdate');
const composeQuery = ({ collection, queryFilters, orderBy, limit, skip }) => {
	const putQueryFilters = () =>
		queryFilters.length
			? {
					$and: [...queryFilters],
			  }
			: null;
	const putOrderBy = () =>
		orderBy && orderBy.column && orderBy.order
			? { [orderBy.column]: orderBy.order }
			: null;
	return collection.find(putQueryFilters()).sort(putOrderBy()).limit(limit).skip(skip);
};
class RecordService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}
	async getData(payloadString) {
		let payload;
		try {
			payload = JSON.parse(decodeURIComponent(payloadString));
			console.log(payload);
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
			const { error: err, value } = await recordDataRequestSchema.validate(payload);
			if (err) {
				return {
					success: false,
					error: {
						message: err.message,
						details: err.details[0].context.message,
					},
				};
			}
			payload = value;
			const { orderBy } = payload;
			const { skip, limit } = payload;
			const filter = payload.filters ? payload.filters : [];
			let queryFilters = [];
			if (filter.length > 0) {
				queryFilters = filter.map((filter) => {
					return {
						[filter.column]: {
							[`$${filter.constraint}`]: filter.value,
						},
					};
				});
			}
			console.log(queryFilters);
			let accidents;
			const query = composeQuery({
				collection: this.db.accidents,
				queryFilters,
				orderBy,
				limit,
				skip,
			});
			accidents = await query;
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
			const { error: err, value } = await recordUpdate.validate(payload);
			if (err) {
				return {
					success: false,
					error: {
						message: err.message,
						details: err.details[0].context.message,
					},
				};
			}
			payload = value;
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
			const { error: err, value } = await recordData.validate(payload);
			if (err) {
				return {
					success: false,
					error: {
						message: err.message,
						details: err.details[0].context.message,
					},
				};
			}
			payload = value;
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
	let response = await fetch('http://localhost:3002/api/users/auth', {
		method: 'GET',
		headers: {
			Authorization: bearerToken,
		},
	});
	response = await response.json();
	// console.log(response);
	if (response.success === false) {
		throw new Error(response.error.message);
	}
}
module.exports = RecordService;
