const Logger = require('../loaders/logger');

function groupBuilder({ bucketType, bucketColumn, timeChart, valueType }) {
	let _id;
	if (bucketType === 'column') {
		_id = `$${bucketColumn}`;
	} else { // query.bucketType === 'time'
		const dateColumn = `$${timeChart.timeAxisBasedOn}Time`;
		_id = {
			year: {$year: dateColumn}
		};
		if (timeChart.bucketSize === 'week') {
			_id.week = {$week: dateColumn};
		} else {
			_id.month = {$month: dateColumn};
			if (timeChart.bucketSize === 'day') {
				_id.day = {$dayOfMonth: dateColumn};
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

function sorter({bucketType}) {
	if (bucketType === 'time') {
		return { _id: 1 };
	} else {
		return { value: -1 };
	}
}

function timeAxisFilter({from, to, timeAxisBasedOn}) {
	const dateColumn = `${timeAxisBasedOn}Time`
	const filter = {};
	if (from) {
		filter.$gte = from;
	}
	if (to) {
		filter.$lte = to;
	}
	return { [dateColumn]: filter };
}

class AccidentService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}

	async getBuckets(query) {
		let aggregate = this.db.accidents.aggregate();
		if (query.filters) {
			for (const filter of query.filters) {
				aggregate = aggregate.match(filterIntoMatch(filter))
			}
		}
		if (query.bucketType === 'time') {
			aggregate = aggregate.match(timeAxisFilter(query.timeChart))
		}
		aggregate = aggregate.group(groupBuilder(query));
		aggregate = aggregate.sort(sorter(query));

		let result = await aggregate.exec();

		if (query.joinBucketsPast) {
			const kept = result.slice(0, query.joinBucketsPast);
			const merged = result.slice(query.joinBucketsPast);
			const other = merged.reduce(
				({_id, value}, current) => ({_id, value: value + current.value}),
				{
					_id: 'other',
					value: 0,
				});
			result = [...kept, other];
		}

		const bucketLabels = result.map(item => item._id);
		const values = result.map(item => item.value);

		return { bucketLabels, values };
	}
}

module.exports = AccidentService;