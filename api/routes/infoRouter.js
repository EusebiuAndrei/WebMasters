const httpStatus = require('http-status-codes');
const router = require('../../Router');

const ROUTE_BASE = '/api/info';

router.get(`${ROUTE_BASE}/:msg/hello/:id`, (req, res) => {
	res.status(httpStatus.OK).json({ msg: 'WoW' });
});

router.post(`${ROUTE_BASE}`, (req, res) => {
	console.log(req.body);
	res.status(300).json({ msg: 'fd' });
});
