const httpStatus = require('http-status-codes');
const fs = require('fs').promises;
const url = require('url');

const { enhanceReqAndRes } = require('./enhancers');
const { tryRoute } = require('./helpers');

const AccessProxy = require('./AccessProxy');
const accessProxy = new AccessProxy(2, 200);

const routes = {
	GET: {},
	POST: {},
	PATCH: {},
	PUT: {},
	DELETE: {},
};

const matchPathname = (method, reqPathname) => {
	const mappedPathname = Object.keys(routes[method]).find((pathname) =>
		tryRoute(reqPathname, pathname),
	);

	return mappedPathname;
};

exports.handle = async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Content-Length');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length');

	// Handling CORS calls
	if (req.method === 'OPTIONS') {
		return res.end('CORS');
	}

	const reqAccess = accessProxy.makeRequest(req.headers.origin, new Date());
	const { pathname } = url.parse(req.url, true);
	const matchedPathname = matchPathname(req.method, pathname);

	try {
		await enhanceReqAndRes(req, res, matchedPathname);
		const root = req.pathname.split('/')[1];

		// Api handler
		if (root === 'api') {
			// Restrict access per time period
			if (!reqAccess.success) {
				return res.status(httpStatus.NOT_FOUND).json({
					success: false,
					error: { message: reqAccess.message },
				});
			}

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
