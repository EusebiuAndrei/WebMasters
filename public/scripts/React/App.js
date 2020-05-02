import * as Map from './Map.js';
import * as Navbar from './Navbar.js';
import * as Banner from './Banner.js';
import * as Statistics from './Statics.js';
import * as BarGraph from './BarGraph.js';
import * as Pie from './Pie.js';
import * as Reports from './Reports.js';
import * as Subscribe from './Subscribe.js';
import * as Footer from './Footer.js';

const App = () => {
	return `
        <div class="container">
            ${Banner.default()}
            ${Navbar.default()}
            ${Map.default()}
            ${Statistics.default()}
            ${BarGraph.default()}
            ${Pie.default()}
            ${Reports.default()}
            ${Subscribe.default()}
            ${Footer.default()}
            
        </div>
            `;
};

const initiateEventListeners = () => {
	Banner.addEventsListeners();
	Navbar.addEventsListeners();
	Map.addEventsListeners();
	Statistics.addEventsListeners();
	BarGraph.addEventsListeners();
	Pie.addEventsListeners();
	Reports.addEventsListeners();
	Subscribe.addEventsListeners();
	Footer.addEventsListeners();
};

export default App;
export { initiateEventListeners };
