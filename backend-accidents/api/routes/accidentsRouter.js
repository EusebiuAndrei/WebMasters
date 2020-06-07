const httpStatus = require('http-status-codes');
const router = require('../../Router');
const { accidentService } = require('../../services');

const ROUTE_BASE = '/api/accidents';

router.get(`${ROUTE_BASE}`, (req, res) => {
	res.status(httpStatus.OK).json({ success: true, msg: 'Hello' });
});

// move to router.get with query params
router.post(`${ROUTE_BASE}/chart_data`, async (req, res) => {
	const result = await accidentService.getBuckets(req.body);
	const status = result.success ? httpStatus.OK : httpStatus.BAD_REQUEST;
	res.status(status).json(result);
});
