import { createStateEvent } from './utils.js';

import * as App from './App.js';

setTimeout(() => {
	const root = document.getElementById('list-example');
	root.dispatchEvent(createStateEvent({ data: ['John', 'Marry'] }));
}, 3000);

const routes = {
	'/': App,
	'/not-found': {
		default: () => '<h1>Not found</h1>',
		initiateEventListeners: () => {},
	},
};

let pathname = location.pathname;
let html = '';

if (!routes[pathname]) {
	window.location.pathname = '/not-found';
}

html = routes[pathname].default();
document.body.innerHTML = html;
routes[pathname].initiateEventListeners();
