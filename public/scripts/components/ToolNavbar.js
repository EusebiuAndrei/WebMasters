import { visualTypeEnum } from '../constants.js';
import VisualButton from './VisualButton.js';
import { getDomStringFromArray } from '../utils/index.js';
import StateManager from '../utils/StateManager.js';

export const visualDescription = {
	[visualTypeEnum.MAP]: 'Map',
	[visualTypeEnum.BAR_GRAPH]: 'Bar Chart',
	[visualTypeEnum.PIE_CHART]: 'Pie Chart',
};

const ToolNavbar = () => {
	const printData = Object.keys(visualTypeEnum).map(
		(visualType) =>
			`<li style="list-style-type: none">${VisualButton({
				id: visualType,
				text: visualDescription[visualType],
			})}</li>`,
	);

	return `
        <div class="container__header">
            <div style="width: 80%; margin: 0 auto; display: flex; justify-content: space-between">
                <div>
                    <p id="current-visual" data-current-visual-id="${
						StateManager.getState().visualType
					}">Current: ${
		visualDescription[StateManager.getState().visualType]
	}</p>
                    <ul style="padding: 0; margin: 0">
                        ${getDomStringFromArray(printData)}
                    </ul>
                </div> 
                <div>
                    <a href="#">Export</a>
                    <a href="#">Options</a>
                </div>
            </div>
        </div>
    `;
};

const addEventsListeners = () => {};

export default ToolNavbar;
export { addEventsListeners };
