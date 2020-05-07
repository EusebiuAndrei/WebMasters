const Logger = require('../loaders/logger');

function groupBuilder({ bucketType, bucketColumn, timeChart, valueType }) {
	let _id;
	if (bucketType === 'column') {
		_id = `$${bucketColumn}`;
	} else { // query.bucketType === 'time'
		const dateColumn = `$${timeChart.timeAxisBasedOn}Time`
		_id = {
			year: {$year: dateColumn}
		};
		if (timeChart.bucketSize === 'week') {
			_id.week = {$week: dateColumn};
		} else {
			_id.month = {$month: dateColumn};
			if (timeChart.bucketSize === 'day') {
				_id.month = {$dayOfMonth: dateColumn};
			}
		}
	}

	let value;
	if (valueType === 'count') {
		value = {$sum: 1};
	} else {
		value = {
			[`$${valueType.type}`]: `$${valueType.column}`
		};
	}

	return { _id, value };
}

function filterIntoMatch({ column, constraint, value }) {
	return {
		[column]: {
			[`$${constraint}`]: value,
		},
	};
}

class AccidentService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}

	async getBuckets(query) {
		let aggregate = this.db.accidents.aggregate();

		for (const filter of query.filters) {
			aggregate = aggregate.match(filterIntoMatch(filter))
		}

		aggregate = aggregate.group(groupBuilder(query));

		const result = await aggregate.exec();

		const bucketLabels = result.map(item => item._id);
		const values = result.map(item => item.value);

		return { bucketLabels, values };
	}
}

module.exports = AccidentService;
