const getContentType = (extension) => {
	switch (extension) {
		case 'css': {
			return 'text/css';
		}
		case 'html': {
			return 'text/html';
		}
		case 'js': {
			return 'text/javascript';
		}
		case 'jpg': {
			return 'image/jpg';
		}
		default: {
			return 'NotFound';
		}
	}
};

const tryRoute = (reqPathname, routePathname) => {
	const arrayFromReqPathname = reqPathname.substr(1).split('/');
	const arrayFromRoutePathname = routePathname.substr(1).split('/');

	if (arrayFromReqPathname.length !== arrayFromRoutePathname.length)
		return false;

	for (
		let index = 0;
		index < arrayFromReqPathname.length;
		index++
	) {
		const reqSlice = arrayFromReqPathname[index];
		const routeSlice = arrayFromRoutePathname[index];

		if (reqSlice.length > 0 && routeSlice.startsWith(':')) {
			continue;
		}

		if (reqSlice !== routeSlice) {
			return false;
		}
	}

	return true;
};

module.exports = {
	getContentType,
	tryRoute,
};
