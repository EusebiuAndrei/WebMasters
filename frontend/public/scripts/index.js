// Utils
// Api
// Components
import * as App from './pages/App.js';
import * as NotFound from './pages/NotFound.js';
import * as Tool from './pages/Tool.js';
import * as Help from './pages/Help.js';
import * as Documentation from './pages/Documentation.js';

// setTimeout(() => {
// 	const root = document.getElementById('list-example');
// 	root.dispatchEvent(createStateEvent({ data: ['John', 'Marry'] }));
// }, 3000);
// console.log(stateManager.getState());

// Router
const routes = {
	'/': App,
	'/not-found': NotFound,
	'/tool': Tool,
	'/docs': Documentation,
	'/help': Help,
};

let pathname = location.pathname;
let html = '';

if (!routes[pathname]) {
	window.location.pathname = '/not-found';
}

html = routes[pathname].default();
document.body.innerHTML = html;
routes[pathname].initialize();
