/* eslint-disable no-underscore-dangle */
// used for mongodb-specific _id variables

const { chartDataRequestSchema } = require('../schemas');

function groupBuilder({ bucketType, bucketColumn, timeChart, valueType }) {
	let _id;
	if (bucketType === 'column') {
		_id = `$${bucketColumn}`;
	} else {
		// query.bucketType === 'time'
		const dateColumn = `$${timeChart.timeAxisBasedOn}Time`;
		_id = {
			year: { $year: dateColumn },
		};
		if (timeChart.bucketSize === 'week') {
			_id.week = { $week: dateColumn };
		} else {
			_id.month = { $month: dateColumn };
			if (timeChart.bucketSize === 'day') {
				_id.day = { $dayOfMonth: dateColumn };
			}
		}
	}

	let value;
	if (valueType === 'count') {
		value = { $sum: 1 };
	} else {
		value = {
			[`$${valueType.type}`]: `$${valueType.column}`,
		};
	}

	return { _id, value };
}

function filterIntoMatch({ column, constraint, value }) {
	let dateValue;
	if (['startTime', 'endTime', 'weatherTimestamp'].includes(column)) {
		if (value instanceof Array) {
			dateValue = value.map((it) => new Date(it));
		} else {
			dateValue = new Date(value);
		}
	}

	if (dateValue) {
		return {
			[column]: {
				[`$${constraint}`]: dateValue,
			},
		};
	}
	return {
		[column]: {
			[`$${constraint}`]: value,
		},
	};
}

function sorter({ bucketType }) {
	if (bucketType === 'time') {
		return { _id: 1 };
	}
	return { value: -1 };
}

function timeAxisFilter({ from, to, timeAxisBasedOn }) {
	const dateColumn = `${timeAxisBasedOn}Time`;
	const filter = {};
	if (from) {
		filter.$gte = from;
	}
	if (to) {
		filter.$lte = to;
	}
	return { [dateColumn]: filter };
}

function timeLabelToString({ year, month, week, day }) {
	if (week) {
		return `${year}w${week}`;
	}
	let str = year.toString();
	if (month) {
		str = `${month}/${str}`;
		if (day) {
			str = `${day}/${str}`;
		}
	}
	return str;
}

class AccidentService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}

	async getBuckets(queryString) {
		let query;

		try {
			query = JSON.parse(decodeURIComponent(queryString));
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

		const { error: err, value } = chartDataRequestSchema.validate(query);
		if (err) {
			return {
				success: false,
				error: {
					message: err.message,
					details: err.details[0].context.message,
				},
			};
		}
		query = value;

		let aggregate = this.db.accidents.aggregate();
		if (query.filters) {
			query.filters.forEach((it) => {
				aggregate = aggregate.match(filterIntoMatch(it));
			});
		}
		if (query.bucketType === 'time') {
			aggregate = aggregate.match(timeAxisFilter(query.timeChart));
		}
		aggregate = aggregate.group(groupBuilder(query));
		aggregate = aggregate.sort(sorter(query));

		let result = await aggregate.exec();

		if (query.joinBucketsPast) {
			const kept = result.slice(0, query.joinBucketsPast);
			const merged = result.slice(query.joinBucketsPast);
			const other = merged.reduce(
				({ _id, value: val }, current) => ({ _id, value: val + current.value }),
				{
					_id: 'other',
					value: 0,
				},
			);
			result = [...kept, other];
		}

		let labels;
		labels = result.map((item) => item._id);
		const data = result.map((item) => item.value);

		if (query.bucketType === 'time') {
			labels = labels.map(timeLabelToString);
		} else {
			labels = labels.map((label) => label.toString());
		}

		return { success: true, data: { labels, data } };
	}
}

module.exports = AccidentService;
