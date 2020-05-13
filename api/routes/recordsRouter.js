const httpStatus = require('http-status-codes');
const router = require('../../Router');
const { recordService } = require('../../services');
const { recordDataRequestSchema } = require('../../schemas');

const ROUTE_BASE = '/api/accidents';

router.get(`${ROUTE_BASE}`, (req, res) => {
	res.status(httpStatus.OK).json({ success: true, msg: 'Hello' });
});


// move to router.get with query params
router.post(`${ROUTE_BASE}/records_data`, async (req, res) => {

  

		const result = await recordService.getData(req.body);
		

		const statusCode = result.success ? 200 : 400;

		res.status(statusCode).json(result);
});