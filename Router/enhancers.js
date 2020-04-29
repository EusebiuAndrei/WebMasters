const pug = require('pug');
const url = require('url');

const enhanceReqAndRes = async (req, res) => {
	await enhanceRequest(req);
	await enhanceResponse(res);
};

const enhanceRequest = async (req) => {
	if (req.method !== 'GET') {
		await collectBody(req);
	}

	enhanceRequestWithQuery(req);
	enhanceRequestWithPathname(req);
};

const enhanceResponse = async (res) => {
	enhanceResponseWithRender(res);
	enhanceResponseWithStatus(res);
	enhanceResponseWithJson(res);
};

const collectBody = (req) => {
	return new Promise((resolve, reject) => {
		let body = [];
		req.on('data', (bodyData) => body.push(bodyData));
		req.on('end', () => {
			body = Buffer.concat(body).toString();
			req.body = JSON.parse(body);
			resolve(body);
		});
		req.on('error', (err) => reject(err));
	});
};

const enhanceRequestWithQuery = (req) => {
	req.query = url.parse(req.url, true).query;
};

const enhanceRequestWithPathname = (req) => {
	req.pathname = url.parse(req.url, true).pathname;
};

const enhanceResponseWithRender = (res) => {
	res.render = (filename, options) => {
		const html = pug.compileFile(`views/${filename}.pug`)(
			options,
		);
		res.setHeader('Content-Type', 'text/html');
		res.end(html);
	};
};

const enhanceResponseWithStatus = (res) => {
	res.status = (statusCode) => {
		res.statusCode = statusCode;
		return res;
	};
};

const enhanceResponseWithJson = (res) => {
	res.json = (obj) => {
		const json = JSON.stringify(obj, null, 2);
		res.setHeader('Content-Type', 'application/json');
		res.end(json);
	};
};

module.exports = {
	enhanceReqAndRes,
	enhanceRequest,
	enhanceResponse,
	collectBody,
	enhanceRequestWithQuery,
	enhanceRequestWithPathname,
	enhanceResponseWithRender,
	enhanceResponseWithStatus,
	enhanceResponseWithJson,
};
