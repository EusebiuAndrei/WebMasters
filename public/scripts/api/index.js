const getUsers = async () => {
	let response = await fetch('http://localhost:3001/api/users');
	response = response.json();

	return response;
};

export { getUsers };
