import { visualTypeEnum } from '../constants.js';
// Components
import MapUS from './Map.js';
import BarGraph from './BarGraph.js';
import Pie from './Pie.js';
// visuals initializers
import { initializeGraph } from '../visuals/graph.js';
import { intializeMap } from '../visuals/index.js';
import { initializePieChart } from '../visuals/pie.js';
import { initializeLineChart } from '../visuals/lineChart.js';
import stateManager from '../utils/StateManager.js';

const Vizualizer = () => {
	const { visualType } = stateManager.getState();
	// console.log('STATE', stateManager.getState());

	return `
		<div style="grid-area: reports;" class="visual-container">
			${getVisualizerByType(visualType)()}
		</div>
	`;
};

const getVisualizerByType = (visualType) => {
	switch (visualType) {
		case visualTypeEnum.MAP:
			return MapUS;
		case visualTypeEnum.LINE_CHART:
			return BarGraph;
		case visualTypeEnum.BAR_GRAPH:
			return BarGraph;
		case visualTypeEnum.PIE_CHART:
			return Pie;
		default:
			return () => '<p>Not existing visual type</p>';
	}
};

const initializeVisualsByType = (visualType) => {
	switch (visualType) {
		case visualTypeEnum.MAP:
			return intializeMap;
		case visualTypeEnum.LINE_CHART:
			return initializeLineChart;
		case visualTypeEnum.BAR_GRAPH:
			return initializeGraph;
		case visualTypeEnum.PIE_CHART:
			return initializePieChart;
		default:
			() => {
			};
	}
};

const addEventsListeners = () => {
};

export default Vizualizer;
export { addEventsListeners, initializeVisualsByType };
