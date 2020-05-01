import { createStateEvent } from './utils.js';

import App from './App.js';
import * as MapUS from './Map.js';
import * as Navbar from './Navbar.js';
import * as Banner from './Banner.js';
import * as BarGraph from './BarGraph.js';
import * as Pie from './Pie.js';
import * as Reports from './Reports.js';
import * as Subscribe from './Subscribe.js';
import * as Footer from './Footer.js';

// setTimeout(() => {
// 	const root = document.getElementById('list-example');
// 	root.dispatchEvent(createStateEvent({ data: ['John', 'Marry'] }));
// }, 3000);

document.body.innerHTML = App();

MapUS.addEventsListeners();
Navbar.addEventsListeners();
Banner.addEventsListeners();
BarGraph.addEventsListeners();
Pie.addEventsListeners();
Reports.addEventsListeners();
Subscribe.addEventsListeners();
Footer.addEventsListeners();
