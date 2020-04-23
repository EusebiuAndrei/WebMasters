const pug = require('pug');

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
	collectBody,
	enhanceResponseWithRender,
	enhanceResponseWithStatus,
	enhanceResponseWithJson,
};
