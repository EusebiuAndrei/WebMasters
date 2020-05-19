import * as converter from '../utils/Converter.js';

const getUsers = async () => {
	let response = await fetch('http://localhost:3001/api/users');
	response = response.json();

	return response;
};

const getDataset = async (data) => {
	let response = await fetch('http://localhost:3001/api/accidents/chart_data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(convertData(data), null, 2),
	});
	response = response.json();

	return response;
};

const convertData = (data) => {
	return {
		...data,
		filters: data.filters
			? data.filters.map(({ column, constraint, value }) => {
					let newValue;

					if (constraint === 'in') {
						newValue = converter.convertArr(column, value);
					} else {
						newValue = converter.conv[converter.columnTypes[column]](value);
					}

					return { column, constraint, value: newValue };
			  })
			: [],
	};
};

export { getUsers, getDataset };
