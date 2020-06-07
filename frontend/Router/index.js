const httpStatus = require('http-status-codes');
const fs = require('fs').promises;
const url = require('url');

const { enhanceReqAndRes } = require('./enhancers');
const { getContentType, tryRoute } = require('./helpers');

const routes = {
	GET: {},
	POST: {},
	PATCH: {},
	PUT: {},
	DELETE: {},
};

const matchPathname = (method, reqPathname) => {
	return Object.keys(routes[method]).find((pathname) =>
		tryRoute(reqPathname, pathname),
	);
};

exports.handle = async (req, res) => {
	const { pathname } = url.parse(req.url, true);
	const matchedPathname = matchPathname(req.method, pathname);

	try {
		await enhanceReqAndRes(req, res, matchedPathname);
		const publicFolder = req.pathname.substr(1).split('/')[0];
		const root = req.pathname.split('/')[1];

		// Serve public folder
		if (['pages', 'styles', 'scripts', 'images'].includes(publicFolder)) {
			try {
				const nrOfDirectories = req.pathname.substr(1).split('/').length;
				const publicFile = req.pathname.substr(1).split('/')[nrOfDirectories - 1];

				const nrOfDots = publicFile.split('.').length;
				const extension = publicFile.split('.')[nrOfDots - 1];

				const data = await fs.readFile(`public/${req.pathname}`);

				res.writeHead(httpStatus.OK, {
					'Content-Type': getContentType(extension),
				});

				return res.end(data);
			} catch (error) {
				return res.status(httpStatus.NOT_FOUND);
			}
		}
		// File Not Found Page
		else {
			const data = await fs.readFile(`public/pages/index.html`);

			res.writeHead(httpStatus.OK, {
				'Content-Type': 'text/html',
			});

			return res.end(data);
		}
	} catch (ex) {
		console.log(`error: ${  ex}`);
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
