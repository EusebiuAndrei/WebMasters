const url = require('url');

const enhanceReqAndRes = async (req, res, matchedPathname) => {
	await enhanceRequest(req, matchedPathname);
	await enhanceResponse(res);
};

const enhanceRequest = async (req, matchedPathname) => {
	if (req.method !== 'GET') {
		await collectBody(req);
	}

	enhanceRequestWithPathname(req);
	enhanceRequestWithQuery(req);
	if (matchedPathname) enhanceRequestWithParams(req, matchedPathname);
};

const enhanceResponse = async (res) => {
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

const enhanceRequestWithParams = (req, matchedPathname) => {
	const pathnameArray = req.pathname.substr(1).split('/');
	const matchedPathnameArray = matchedPathname.substr(1).split('/');

	req.params = {};
	for (let index = 0; index < pathnameArray.length; index++) {
		if (matchedPathnameArray[index].startsWith(':')) {
			req.params[matchedPathnameArray[index].substr(1)] = pathnameArray[index];
		}
	}
};

const enhanceRequestWithPathname = (req) => {
	req.pathname = url.parse(req.url, true).pathname;
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
	enhanceResponseWithStatus,
	enhanceResponseWithJson,
};
