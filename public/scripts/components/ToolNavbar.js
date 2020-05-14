import { visualTypeEnum } from '../constants.js';
import VisualButton from './VisualButton.js';
import {
	getDomStringFromArray,
	getDomElementFromDomString,
} from '../utils/index.js';
import StateManager from '../utils/StateManager.js';
import * as Options from './Options.js';
import Export from './Export.js';

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
                    <a href="#" id="js-export">Export</a>
                    <a href="#" id="js-options">Options</a>
                </div>
            </div>
        </div>
    `;
};

const addEventsListeners = () => {
	const settingsRoot = document.getElementById('js-settings');
	const optionsLink = document.getElementById('js-options');
	const exportLink = document.getElementById('js-export');

	optionsLink.addEventListener('click', (event) => {
		const optionsContainer = document.querySelector(
			'.options-container',
		);

		console.log(Options.default());

		if (optionsContainer === null) {
			settingsRoot.children[0]?.remove();
			settingsRoot.append(
				getDomElementFromDomString(Options.default()),
			);
			Options.addEventsListeners();
		} else {
			optionsContainer.remove();
		}
	});

	exportLink.addEventListener('click', (event) => {
		const exportContainer = document.querySelector(
			'.export-container',
		);

		if (exportContainer === null) {
			settingsRoot.children[0]?.remove();
			settingsRoot.append(getDomElementFromDomString(Export()));
		} else {
			exportContainer.remove();
		}
	});
};

export default ToolNavbar;
export { addEventsListeners };
