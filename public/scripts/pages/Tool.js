// Components
import * as Banner from '../components/Banner.js';
import * as Footer from '../components/Footer.js';
import * as Vizualizer from '../components/Visualizer.js';
import * as ToolNavbar from '../components/ToolNavbar.js';

// Api
import * as api from '../api/index.js';

import stateManager from '../utils/StateManager.js';
import { visualTypeEnum } from '../constants.js';
import * as VisualButton from '../components/VisualButton.js';

const Tool = () => {
	// console.log(stateManager.getState());

	return `
        <div class="container">
            ${Banner.default()}
            ${ToolNavbar.default()}
			${Vizualizer.default()}
			<div id="js-settings">
			</div>
            ${Footer.default()}
        </div>
            `;
};

const initializeEventListeners = () => {
	Banner.addEventsListeners();
	ToolNavbar.addEventsListeners();
	Footer.addEventsListeners();
	Vizualizer.addEventsListeners();

	Object.keys(visualTypeEnum).forEach((visualType) =>
		VisualButton.addEventsListeners('a-' + visualType),
	);
};

const initializeVisuals = () => {
	// console.log('AAA', stateManager.getStateForVisual().fetchedData);

	console.log(stateManager.getState());
	Vizualizer.initializeVisualsByType(stateManager.getState().visualType)(
		stateManager.getStateForVisual().fetchedData,
	);
};

const initialize = () => {
	initializeEventListeners();
	initializeVisuals();
};

export default Tool;
export { initialize, initializeEventListeners, initializeVisuals };
