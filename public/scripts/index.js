// Utils
import { createStateEvent } from './utils/index.js';

// Components
import * as App from './pages/App.js';

// Api
import * as api from './api/index.js';

// setTimeout(() => {
// 	const root = document.getElementById('list-example');
// 	root.dispatchEvent(createStateEvent({ data: ['John', 'Marry'] }));
// }, 3000);

const routes = {
	'/': App,
	'/not-found': {
		default: () => '<h1>Not found</h1>',
		initialize: () => {},
	},
};

let pathname = location.pathname;
let html = '';

if (!routes[pathname]) {
	window.location.pathname = '/not-found';
}

html = routes[pathname].default();
document.body.innerHTML = html;
routes[pathname].initialize();

// An example of using calls to backend
const runFetch = async () => {
	const response = await api.getUsers();

	console.log(response);
};
runFetch();
