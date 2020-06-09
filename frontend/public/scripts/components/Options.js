import StateManager from '../utils/StateManager.js';
import {
	allColumns,
	discreteColumns,
	numericColumns,
	visualTypeEnum,
} from '../constants.js';
import {
	eventApplyForm,
	getDomElementFromDomString,
	getDomStringFromArray,
} from '../utils/index.js';
import * as api from '../api/index.js';
import Spinner from './Spinner.js';
import ErrorBar from './ErrorBar.js';

// fds
const Options = () => {
	const { inputData } = StateManager.getStateForVisual();
	const { visualType } = StateManager.getState();
	// console.log(inputData);

	return `
            <div class="options-container">
                <form>
                    <div>
                        <div>
                            <button type="button" id="js-add-dataset">+</button>
                        </div>
                        <div id="js-chart-data">
                            <label>
                                <span>Bucket Type</span>
                                <select name="bucketType" id="js-bucket" style="display: block;">
                                    <option value="time" ${
										visualType === visualTypeEnum.BAR_GRAPH
											? 'selected'
											: ''
									}>Time</option>
                                    <option value="column" ${
										visualType === visualTypeEnum.MAP ||
										visualType === visualTypeEnum.PIE_CHART
											? 'selected'
											: ''
									}>Column</option>
                                </select>
                            </label>

                            ${
								inputData.bucketType === 'column'
									? BucketColumn()
									: TimeChart()
							}
                            
                            ${
								visualType === visualTypeEnum.PIE_CHART
									? `<label id="js-join-buckets-past">
                                        <span>Join Buckets Past</span>
                                        <input value="6" type="text" name="joinBucketsPast" style="display: block;"/>
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
            <label>
                <span>Data target</span>
                ${SelectForColumn(numericColumns)}
            </label>
            <label>
                <span>Aggregation</span>
                <select style="display: block;">
                    <option value="avg">Average</option>
                    <option value="min">Minimum</option>
                    <option value="max">Maximum</option>
                </select>
            </label>
        </div>
    `;
};

const TimeChart = () => {
	return `
        <div id="js-time-more">
            <label>
                <span>Data target</span>
                <select style="display: block;">
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option selected value="month">Month</option>
                    <option value="year">Year</option>
                </select>
            </label>
            <label>
                <span>Start date</span>
                <input type="date" value="2016-03-23"/>
            </label>
            <label>
                <span>End date</span>
                <input type="date" value="2019-12-31"/>
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
                ${SelectForColumn(allColumns)}
            </label>
            <label>
                <span>Constraint</span>
                <select style="display: block;">
                    <option value="in">In the next values</option>
                    <option value="ne">Not Equal To</option>
                    <option value="lte">Less than or equal to</option>
                    <option value="gte">Greater than or equal to</option>
                    <option value="lt">Less than</option>
                    <option value="gt">Greater than</option>
                </select>
            </label>
            <label>
                <span>Value</span>
                <input type="text" />
            </label>
        </div>
    `;
};
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
        <label id="js-bucket-column">
            <span>Bucket Column</span>
            ${SelectForColumn(discreteColumns)}
        </label>
    `;
};

const SelectForColumn = (columns) => {
	const options = columns.map(
		(column) =>
			`<option value="${column}">${
				column.charAt(0).toUpperCase() + column.slice(1)
			}</option>`,
	);

	return `
		<select style="display: block;">
			${getDomStringFromArray(options)}
		</select>
	`;
};

const addEventsListeners = () => {
	const settings = document.getElementById('js-settings');
	const form = settings.querySelector('form');
	const inputs = settings.querySelectorAll('input');
	const value_type = settings.querySelector('#js-value-type');
	const buttonAddDataset = document.getElementById('js-add-dataset');
	const buttonBucketType = document.getElementById('js-bucket');

	inputs.forEach((input) =>
		input.addEventListener('change', (event) => {
			console.log('AAAAAA');
			console.log(event.target);
		}),
	);

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const spinner = getDomElementFromDomString(Spinner());
		form.append(spinner);

		const chartData = computeChartDataObjectFromDom();
		const datasets = computeDatasetsObjectFromDom(form);

		const root = document.getElementById(`a-${StateManager.getState().visualType}`);

		if (datasets.length === 0) {
			let chartLabels = [];
			let chartDatasets = [];

			try {
				const {
					data: { labels, data },
				} = await api.getDataset(chartData);
				chartLabels = labels;
				chartDatasets.push({ name: 'Default name', data });

				const fetchedData = {
					labels: chartLabels,
					data: chartDatasets,
				};

				// console.log('!!!!');
				// console.log(fetchedData);
				// console.log('!!!!');

				// console.log('STATE', StateManager.getState());
				StateManager.setFetchedData(fetchedData);
				root.dispatchEvent(eventApplyForm);
				// console.log('STATE', StateManager.getState());
			} catch (error) {
				// console.log('AAAAAAAA');
				// console.trace(error);
			}

			return;
		} else {
			console.log('BBBBBBBBBBBBBBBBBBBBBBBBBB');
			let chartLabels = [];
			let chartDatasets = [];
			for (const dataset of datasets) {
				const { filters } = dataset;
				const payload = { ...chartData, filters };

				console.log(payload);
				try {
					const {
						data: { labels, data },
					} = await api.getDataset(payload);
					chartLabels = labels;
					chartDatasets.push({ name: dataset.name, data });
				} catch (error) {
					const errorBar = getDomElementFromDomString(
						ErrorBar({
							datasetName: dataset.name,
							errMsg: error.message,
						}),
					);
					form.append(errorBar);

					spinner.remove();
					return;
				}
			}

			const fetchedData = {
				labels: chartLabels,
				data: chartDatasets,
			};

			// console.log('!!!!');
			// console.log(fetchedData);
			// console.log('!!!!');

			// console.log('STATE', StateManager.getState());
			StateManager.setFetchedData(fetchedData);
			root.dispatchEvent(eventApplyForm);
			// console.log('STATE', StateManager.getState());
		}

		spinner.remove();
	});

	value_type.addEventListener('change', (event) => {
		console.log(event.target.value);
		const valueMore = document.getElementById('js-value-type-more');

		if (event.target.value === 'count') {
			if (valueMore) {
				valueMore.remove();
			}
		} else {
			console.log(event.target.parentElement);
			event.target.parentElement.after(getDomElementFromDomString(ValueType()));
		}
	});

	buttonAddDataset.addEventListener('click', (event) => {
		if (
			StateManager.getState().visualType === visualTypeEnum.MAP ||
			StateManager.getState().visualType === visualTypeEnum.PIE_CHART
		) {
			const nrOfDatasets = buttonAddDataset.parentElement.children.length - 1;
			if (nrOfDatasets >= 1) {
				return;
			}
		}

		event.target.before(getDomElementFromDomString(Dataset()));

		// button add filter
		event.target.previousElementSibling
			.querySelector('#js-add-filter')
			.addEventListener('click', (event) => {
				event.target.before(getDomElementFromDomString(Filter()));
			});

		event.target.previousElementSibling
			.querySelector('#js-remove-dataset')
			.addEventListener('click', (event) => {
				console.log(event.target.parentElement.remove());
			});
	});

	buttonBucketType.addEventListener('click', (event) => {
		const domBucketColumn = document.getElementById('js-bucket-column');
		const domTimeChart = document.getElementById('js-time-more');
		console.log(event.target.value);

		if (event.target.value === 'column') {
			if (domTimeChart) {
				domTimeChart.replaceWith(getDomElementFromDomString(BucketColumn()));
			}
		} else {
			if (domBucketColumn) {
				domBucketColumn.replaceWith(getDomElementFromDomString(TimeChart()));
			}
		}
	});
};

const computeChartDataObjectFromDom = () => {
	const domChartData = document.getElementById('js-chart-data');
	const domBucketColumn = document.getElementById('js-bucket-column');
	const domTimeChart = document.getElementById('js-time-more');
	const domValueTypeMore = document.getElementById('js-value-type-more');
	const domJoinBucketsPast = document.getElementById('js-join-buckets-past');
	const data = {};

	const bucketType = domChartData.children[0].children[1].value;
	data.bucketType = bucketType;

	if (bucketType === 'column') {
		data.bucketColumn = domBucketColumn.children[1].value;
	} else {
		data.timeChart = {
			bucketSize: domTimeChart.children[0].children[1].value,
			from: domTimeChart.children[1].children[1].value,
			to: domTimeChart.children[2].children[1].value,
			timeAxisBasedOn: domTimeChart.children[3].children[1].value,
		};
	}

	const domValueType = domValueTypeMore
		? domChartData.children[domChartData.children.length - 2]
		: domChartData.children[domChartData.children.length - 1];
	const valueType = domValueType.children[1].value;

	if (valueType === 'count') {
		data.valueType = valueType;
	} else {
		data.valueType = {
			column: domValueTypeMore.children[0].children[1].value,
			type: domValueTypeMore.children[1].children[1].value,
		};
	}

	if (domJoinBucketsPast) {
		data.joinBucketsPast = domJoinBucketsPast.children[1].value;
	}

	return data;
};

const computeDatasetsObjectFromDom = (form) => {
	const datasets = [];

	const domDatasets = form.querySelectorAll('.dataset');
	domDatasets.forEach((domDataset) => {
		const domDatasetFilter = domDataset.querySelectorAll('.dataset-filter');
		const dataset = {
			name: domDataset.children[0].children[1].value,
			filters: [],
		};

		domDataset.querySelectorAll('.dataset-filter').forEach((datasetFilter) => {
			const value = datasetFilter.children[2].children[1].value;
			const filter = {
				column: datasetFilter.children[0].children[1].value,
				constraint: datasetFilter.children[1].children[1].value,
			};

			if (filter.constraint === 'in') {
				// Use what Tudor gave
				filter.value = value;
			} else {
				filter.value = parseInt(value);
			}

			dataset.filters.push(filter);
		});

		datasets.push(dataset);
	});

	return datasets;
};

export default Options;
export { addEventsListeners };
