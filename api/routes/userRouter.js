const httpStatusCodes = require('http-status-codes');
const { userService } = require('../../services');
const router = require('../../Router');

const ROUTE_BASE = '/users';

// Here we have all the controllers
router.get(`${ROUTE_BASE}`, async (req, res) => {
	const result = await userService.getAllUsers();
	const statusCode = result.success ? 200 : 400;

	res.status(statusCode).json(result);
});

router.post(`${ROUTE_BASE}/register`, async function (req, res) {
	const result = await userService.register(req.body);
	const statusCode = result.success ? 201 : 400;

	res.status(statusCode).json(result);
});
