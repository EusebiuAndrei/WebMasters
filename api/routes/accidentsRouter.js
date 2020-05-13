const httpStatus = require('http-status-codes');
const router = require('../../Router');
const { accidentService } = require('../../services');
const { chartDataRequestSchema } = require('../../schemas');

const ROUTE_BASE = '/api/accidents';

router.get(`${ROUTE_BASE}`, (req, res) => {
	res.status(httpStatus.OK).json({ success: true, msg: 'Hello' });
});

// move to router.get with query params
router.post(`${ROUTE_BASE}/chart_data`, async (req, res) => {
	const { error, value } = chartDataRequestSchema.validate(req.body);
	if (error) {
		res.status(httpStatus.BAD_REQUEST).json(error.message);
	} else {
		const result = await accidentService.getBuckets(value);
		res.status(httpStatus.OK).json(result);
	}
});