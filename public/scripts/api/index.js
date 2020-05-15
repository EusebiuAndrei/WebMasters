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
		body: JSON.stringify(data, null, 2),
	});
	response = response.json();

	return response;
};

export { getUsers, getDataset };
