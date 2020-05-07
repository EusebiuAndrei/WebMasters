const httpStatus = require('http-status-codes');
const router = require('../../Router');
const { accidentService } = require('../../services');

const ROUTE_BASE = '/api/accidents';

router.get(`${ROUTE_BASE}`, (req, res) => {
	res.status(httpStatus.OK).json({ success: true, msg: 'Hello' });
});

router.get(`${ROUTE_BASE}/chart_data`, async (req, res) => {
	const result = await accidentService.getBuckets({
		bucketType: 'column',
		bucketColumn: 'state',
		valueType: 'count',
		filters: [],
	});

	res.status(httpStatus.OK).json(result);
});