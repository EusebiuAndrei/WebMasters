const httpStatus = require('http-status-codes');
const router = require('../../Router');
const { recordService } = require('../../services');

const ROUTE_BASE = '/api/records';

/* get an accident by id */
router.get(`${ROUTE_BASE}/:id`, async (req, res) => {
	const result = await recordService.getAccidentById(
		req.params,
		req.headers.authorization,
	);
	const statusCode = result.success ? 200 : 400;
	res.status(statusCode).json(result);
});

/* delete an accident by id */
router.delete(`${ROUTE_BASE}/:id`, async (req, res) => {
	const result = await recordService.deleteAccidentById(
		req.params,
		req.headers.authorization,
	);
	const statusCode = result.success ? 200 : 400;
	res.status(statusCode).json(result);
});

/* update an accident by id */
router.patch(`${ROUTE_BASE}/:id`, async (req, res) => {
	const result = await recordService.updateAccidentById(
		req.params,
		req.body,
		req.headers.authorization,
	);
	const statusCode = result.success ? 200 : 400;
	res.status(statusCode).json(result);
});

router.get(`${ROUTE_BASE}`, async (req, res) => {
	const result = await recordService.getData(req.query.query);
	const statusCode = result.success ? 200 : 400;
	res.status(statusCode).json(result);
});

/* add an accident */
router.post(`${ROUTE_BASE}`, async (req, res) => {
	const result = await recordService.addAccident(req.body, req.headers.authorization);
	const statusCode = result.success ? 200 : 400;
	res.status(statusCode).json(result);
});
