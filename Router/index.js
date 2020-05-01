const httpStatus = require('http-status-codes');
const fs = require('fs').promises;

const { enhanceReqAndRes } = require('./enhancers');
const { getContentType } = require('./helpers');

const routes = {
	GET: {},
	POST: {},
	PATCH: {},
	PUT: {},
	DELETE: {},
};

exports.handle = async (req, res) => {
	try {
		await enhanceReqAndRes(req, res);
		const publicFolder = req.pathname.substr(1).split('/')[0];

		// Serve public folder
		if (
			['pages', 'styles', 'scripts', 'images'].includes(
				publicFolder,
			)
		) {
			try {
				const nrOfDirectories = req.pathname
					.substr(1)
					.split('/').length;
				const publicFile = req.pathname.substr(1).split('/')[
					nrOfDirectories - 1
				];

				const extension = publicFile.split('.')[1];
				const data = await fs.readFile(
					`public/${req.pathname}`,
				);

				res.writeHead(httpStatus.OK, {
					'Content-Type': getContentType(extension),
				});

				return res.end(data);
			} catch (error) {
				return res
					.status(httpStatus.NOT_FOUND)
					.render('error');
			}
		}
		// Fire the aproppiate request handler
		if (routes[req.method][req.pathname]) {
			routes[req.method][req.pathname](req, res);
		}
		// File Not Found Page
		else {
			res.status(httpStatus.NOT_FOUND).render('error');
		}
	} catch (ex) {
		console.log('error: ' + ex);
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
