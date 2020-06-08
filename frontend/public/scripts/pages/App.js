// Components
import * as Map from '../components/Map.js';
import * as Navbar from '../components/Navbar.js';
import * as Banner from '../components/Banner.js';
import * as Statistics from '../components/Statistics.js';
import * as BarGraph from '../components/BarGraph.js';
import * as Pie from '../components/Pie.js';
import * as Reports from '../components/Reports.js';
import * as Footer from '../components/Footer.js';

// Gharts, Maps, Pie, Charts(in general)
import { initializeGraph } from '../visuals/graph.js';
import { intializeMap } from '../visuals/index.js';
import { initializePieChart } from '../visuals/pie.js';

// Api
import * as api from '../api/index.js';
import { visualTypeEnum } from '../constants.js';
import StateManager from '../utils/StateManager.js';

const App = () => {
	return `
        <div class="container">
            ${Banner.default()}
            ${Navbar.default()}
            ${Map.default()}
            ${Statistics.default()}
            ${BarGraph.default()}
            ${Pie.default()}
            ${Footer.default()}
            
        </div>
            `;
};

const initializeEventListeners = () => {
	Banner.addEventsListeners();
	Navbar.addEventsListeners();
	Map.addEventsListeners();
	Statistics.addEventsListeners();
	BarGraph.addEventsListeners();
	Pie.addEventsListeners();
	Reports.addEventsListeners();
	Footer.addEventsListeners();
};

const initializeVisuals = () => {
	// Run visuals
	initializeGraph(
		StateManager.getStateByVisualType(visualTypeEnum.LINE_CHART).fetchedData,
	);
	intializeMap(StateManager.getStateByVisualType(visualTypeEnum.MAP).fetchedData);
	initializePieChart(
		StateManager.getStateByVisualType(visualTypeEnum.PIE_CHART).fetchedData,
	);
};

const initialize = () => {
	initializeEventListeners();
	initializeVisuals();

	// An example of using calls to backend
	const runFetch = async () => {
		const response = await api.getUsers();

		console.log(response);
	};
	runFetch();
};

export default App;
export { initialize, initializeEventListeners, initializeVisuals };
