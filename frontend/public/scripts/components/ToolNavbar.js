import { visualTypeEnum } from '../constants.js';
import VisualButton from './VisualButton.js';
import { getDomElementFromDomString, getDomStringFromArray } from '../utils/index.js';
import StateManager from '../utils/StateManager.js';
import * as Options from './Options.js';
import * as Export from './Export.js';

export const visualDescription = {
	[visualTypeEnum.MAP]: 'Map',
	[visualTypeEnum.LINE_CHART]: 'Line Chart',
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
                <div class="current-visual-hover">
                    <p id="current-visual" data-current-visual-id="${
		StateManager.getState().visualType
	}">Current: ${
		visualDescription[StateManager.getState().visualType]
	}</p>
                    <ul style="padding: 0; margin: 0">
                        ${getDomStringFromArray(printData)}
                    </ul>
                </div> 
                <div class="tool-button-container">
                    <a class="button" href="#" id="js-export">Export</a>
                    <a class="button" href="#" id="js-options">Options</a>
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
		const optionsContainer = document.querySelector('.options-container');

		// console.log(Options.default());

		if (optionsContainer === null) {
			if (settingsRoot.children[0]) {
				settingsRoot.children[0].remove();
			}
			settingsRoot.append(getDomElementFromDomString(Options.default()));
			Options.addEventsListeners();
		} else {
			optionsContainer.remove();
		}
	});

	exportLink.addEventListener('click', (event) => {
		const exportContainer = document.querySelector('.export-container');

		if (exportContainer === null) {
			if (settingsRoot.children[0]) {
				settingsRoot.children[0].remove();
			}
			settingsRoot.append(getDomElementFromDomString(Export.default()));
			Export.addEventsListeners();
		} else {
			exportContainer.remove();
		}
	});
};

export default ToolNavbar;
export { addEventsListeners };
