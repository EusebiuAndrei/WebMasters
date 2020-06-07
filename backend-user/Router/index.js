const httpStatus = require('http-status-codes');
const fs = require('fs').promises;
const url = require('url');

const { enhanceReqAndRes } = require('./enhancers');
const { tryRoute } = require('./helpers');

const routes = {
	GET: {},
	POST: {},
	PATCH: {},
	PUT: {},
	DELETE: {},
};

const matchPathname = (method, reqPathname) => {
	const mappedPathname = Object.keys(
		routes[method],
	).find((pathname) => tryRoute(reqPathname, pathname));

	return mappedPathname;
};

exports.handle = async (req, res) => {
	const { pathname } = url.parse(req.url, true);
	const matchedPathname = matchPathname(req.method, pathname);

	try {
		await enhanceReqAndRes(req, res, matchedPathname);
		const root = req.pathname.split('/')[1];

		// Api handler
		if (root === 'api') {
			// Fire the appropriate request handler

			if (routes[req.method][matchedPathname]) {
				return routes[req.method][matchedPathname](req, res);
			}

			res.status(httpStatus.NOT_FOUND).json({
				success: false,
				error: { message: 'Not Found' },
			});
		}
		// File Not Found Page
		else {
			res.writeHead(httpStatus.NOT_FOUND, {
				'Content-Type': 'text/html',
			});

			return res.end();
		}
	} catch (ex) {
		console.log(`error: ${ex}`);
	}
};
exports.get = (url, action) => {
	routes['GET'][url] = action;
};
exports.post = (url, action) => {
	routes['POST'][url] = action;
};
exports.patch = (url, action) => {
	routes['PATCH'][url] = action;
};
exports.put = (url, action) => {
	routes['PUT'][url] = action;
};
exports.delete = (url, action) => {
	routes['DELETE'][url] = action;
};
exports.matchPathname = matchPathname;
