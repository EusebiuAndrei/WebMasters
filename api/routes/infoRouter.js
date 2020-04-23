const httpStatusCodes = require('http-status-codes');
const router = require('../../Router');

const ROUTE_BASE = '/info';

router.get(`${ROUTE_BASE}`, (req, res) => {
	res.status(httpStatusCodes.OK).render('new', {
		name: 'Timothy',
	});
});

router.post(`${ROUTE_BASE}`, (req, res) => {
	console.log(req.body);
	res.status(300).json({ msg: 'fd' });
});
