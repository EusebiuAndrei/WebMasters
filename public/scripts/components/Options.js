import StateManager from '../utils/StateManager.js';
import { visualTypeEnum } from '../constants.js';
import { getDomElementFromDomString } from '../utils/index.js';

const Options = () => {
	const { inputData } = StateManager.getStateForVisual();
	const { visualType } = StateManager.getState();
	console.log(inputData);

	return `
            <div class="options-container">
                <form>
                    <div>
                        <div>
                            <button type="button" id="js-add-dataset">+</button>
                        </div>
                        <div>
                            <label>
                                <span>Bucket Type</span>
                                <select name="bucketType" style="display: block;">
                                    <option value="time" ${
										visualType ===
										visualTypeEnum.BAR_GRAPH
											? 'selected'
											: ''
									}>Time</option>
                                    <option value="column" ${
										visualType ===
											visualTypeEnum.MAP ||
										visualType ===
											visualTypeEnum.PIE_CHART
											? 'selected'
											: ''
									}>Column</option>
                                </select>
                            </label>

                            ${
								inputData.bucketType === 'column'
									? BucketColumn()
									: ''
							}
                            
                            ${
								visualType ===
								visualTypeEnum.PIE_CHART
									? `<label>
                                        <span>Join Buckets Past</span>
                                        <input type="text" name="joinBucketsPast" style="display: block;"/>
                                    </label>`
									: ''
							}
                            
                            <label>
                                <span>Value type of a bucket</span>
                                <select style="display: block;" id="js-value-type">
                                    <option value="count">Number of accidents</option>
                                    <option value="other">Custom value</option>
                                </select>
                            </label>

                            ${
								inputData.bucketType === 'time'
									? TimeChart()
									: ''
							}
                        </div>
                    </div>

                    <button type="submit" id="js-apply-form" style="margin: 0 auto; display: block;">Apply</button>
                </form>
            </div>
        `;
};

const ValueType = () => {
	return `
        <div id="js-value-type-more">
            <label>Data target
                <select style="display: block;">
                    <option value="temperature">Temperature</option>
                    <option value="severity">Severity</option>
                    <option value="humidity">Humidity</option>
                    <option value="pressure">Pressure</option>
                    <option value="visibility">Visibility</option>
                    <option value="precipitation">Precipitation</option>
                    <option value="windSpeed">Wind speed</option>
                    <option value="windChill">Wind chill</option>
                </select>
            </label>
            <label>Aggreagation
                <select style="display: block;">
                    <option value="avg">Average</option>
                    <option value="min">Minimum</option>
                    <option value="max">Maximum</option>
                </select>
            </label>
        </div>
    `;
};
// dsa
const TimeChart = () => {
	return `
        <div id="js-time-more">
            <label>
                <span>Data target</span>
                <select style="display: block;">
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
            </label>
            <label>
                <span>Start date</span>
                <input type="date" />
            </label>
            <label>
                <span>End date</span>
                <input type="date" />
            </label>
            <label>
                <span>Time Axis based on</span>
                <select style="display: block;">
                    <option value="start">Start of the accident</option>
                    <option value="end">End of the accident</option>
                </select>
            </label>
        </div>
    `;
};

const Filter = () => {
	return `
        <div class="dataset-filter">
            <label>
                <span>Column</span>
                <input type="text" />
            </label>
            <label>
                <span>Constraint</span>
                <select style="display: block;">
                    <option value="in">In the next values</option>
                    <option value="ne">Not Equal To</option>
                    <option value="lte">Less than or equal to</option>
                    <option value="gte">Grater than or equal to</option>
                    <option value="lt">Less than</option>
                    <option value="gt">Grater than</option>
                </select>
            </label>
            <label>
                <span>Value</span>
                <input type="text" />
            </label>
        </div>
    `;
};
// dfsds jvgf sdf
const Dataset = () => {
	return `
        <div id="" class="dataset">
            <label>
                <span>Dataset name</span>
                <input type="text" />
            </label>
            <p>Filters</p>
            <button type="button" id="js-add-filter">Add filter</button>
            <button type="button" id="js-remove-dataset">Remove dataset</button>
        </div>
    `;
};

const BucketColumn = () => {
	return `
        <label>
            <span>Bucket Column</span>
            <input type="text" name="bucketColumn" style="display: block;"/>
        </label>
    `;
};

const addEventsListeners = () => {
	const settings = document.getElementById('js-settings');
	const form = settings.querySelector('form');
	const inputs = settings.querySelectorAll('input');
	const value_type = settings.querySelector('#js-value-type');

	inputs.forEach((input) =>
		input.addEventListener('change', (event) => {
			console.log('AAAAAA');
			console.log(event.target);
		}),
	);

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		console.log(event.target.elements);
		console.log(event.target);
		console.log(event.currentTarget);
	});

	value_type.addEventListener('change', (event) => {
		console.log(event.target.value);
		const valueMore = document.getElementById(
			'js-value-type-more',
		);

		if (event.target.value === 'count') {
			if (valueMore) {
				valueMore.remove();
			}
		} else {
			console.log(event.target.parentElement);
			event.target.parentElement.after(
				getDomElementFromDomString(ValueType()),
			);
		}
	});

	const buttonAddDataset = document.getElementById(
		'js-add-dataset',
	);
	buttonAddDataset.addEventListener('click', (event) => {
		event.target.before(getDomElementFromDomString(Dataset()));

		// button add filter
		event.target.previousElementSibling
			.querySelector('#js-add-filter')
			.addEventListener('click', (event) => {
				event.target.before(
					getDomElementFromDomString(Filter()),
				);
			});

		event.target.previousElementSibling
			.querySelector('#js-remove-dataset')
			.addEventListener('click', (event) => {
				console.log(event.target.parentElement.remove());
			});
	});
};

export default Options;
export { addEventsListeners };
