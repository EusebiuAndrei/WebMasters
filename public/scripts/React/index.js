import { createStateEvent } from './utils.js';

import App from './App.js';
import * as ListExample from './ListExample.js';
import * as Greeter from './ListExample.js';
import * as MapUS from './ListExample.js';

setTimeout(() => {
	const root = document.getElementById('list-example');
	root.dispatchEvent(createStateEvent({ data: ['John', 'Marry'] }));
}, 3000);

document.body.innerHTML = App();

ListExample.addEventsListeners();
Greeter.addEventsListeners();
MapUS.addEventsListeners();
