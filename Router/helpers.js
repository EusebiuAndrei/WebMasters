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

module.exports = {
	getContentType,
};
