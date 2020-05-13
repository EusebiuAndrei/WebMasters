const httpStatus = require('http-status-codes');
const router = require('../../Router');
const { recordService } = require('../../services');

const ROUTE_BASE = '/api/records';


/* get an accident by id */
router.get(`${ROUTE_BASE}`, async (req, res) => {
	
	const result = await recordService.getAccidentById(req.query);
	const statusCode = result.success ? 200 : 400;
	res.status(statusCode).json(result);

});


// move to router.get with query params
router.post(`${ROUTE_BASE}`, async (req, res) => {

		const result = await recordService.getData(req.body);
		const statusCode = result.success ? 200 : 400;
		res.status(statusCode).json(result);
});
