const httpStatus = require('http-status-codes');
const fs = require('fs').promises;

const {
	collectBody,
	enhanceResponseWithRender,
	enhanceResponseWithStatus,
	enhanceResponseWithJson,
} = require('./enhancers');
const { getContentType } = require('./helpers');

const routes = {
	GET: {},
	POST: {},
	PATCH: {},
	PUT: {},
	DELETE: {},
};

const enhanceReqAndBody = async (req, res) => {
	if (req.method !== 'GET') {
		await collectBody(req);
	}

	enhanceResponseWithRender(res);
	enhanceResponseWithStatus(res);
	enhanceResponseWithJson(res);
};

exports.handle = async (req, res) => {
	try {
		
		await enhanceReqAndBody(req, res);
		const [publicFolder, publicFile] = req.url
			.substr(1)
			.split('/');

		// Serve public folder
		if (
			['pages', 'styles', 'scripts', 'images'].includes(
				publicFolder,
			)
		) {
			try {
				
				const extension = publicFile.split('.')[1];
				const data = await fs.readFile(
					`public/${publicFolder}/${publicFile}`,
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
		if (routes[req.method][req.url]) {
			routes[req.method][req.url](req, res);
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
