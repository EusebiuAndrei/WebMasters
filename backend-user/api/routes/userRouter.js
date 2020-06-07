const httpStatusCodes = require('http-status-codes');
const { userService } = require('../../services');
const router = require('../../Router');

const ROUTE_BASE = '/api/users';

// Here we have all the controllers
router.get(`${ROUTE_BASE}`, async (req, res) => {
	const result = await userService.getAllUsers();
	const statusCode = result.success ? 200 : 400;

	res.status(statusCode).json(result);
});

router.get(`${ROUTE_BASE}/auth`, async (req, res) => {
	// console.log(req.headers.authorization);
	const result = await userService.authorize(
		req.headers.authorization,
	);
	const statusCode = result.success ? 200 : 404;
	res.status(statusCode).json(result);
});

router.post(`${ROUTE_BASE}/register`, async function (req, res) {
	const result = await userService.register(req.body);
	const statusCode = result.success ? 201 : 400;

	res.status(statusCode).json(result);
});
