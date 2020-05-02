const httpStatus = require('http-status-codes');
const router = require('../../Router');

const ROUTE_BASE = '/api/accidents';

router.get(`${ROUTE_BASE}`, (req, res) => {
	res.status(httpStatus.OK).json({ success: true, msg: 'Hello' });
});
