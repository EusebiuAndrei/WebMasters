import { visualTypeEnum } from '../constants.js';

class StateManager {
	state = initialState;

	constructor() {
		// console.log('CONSTRUCTOR', this.existsState());

		if (this.existsState()) {
			this.state = this.getState();
			// console.log('WOW', this.state);
			return;
		}

		this.setState({});
		// console.log(this.getState());
	}

	setState = (payload) => {
		// console.log('SET STATE');
		this.state = { ...this.state, ...payload };

		const jsonState = JSON.stringify(this.state);

		sessionStorage.setItem('state', jsonState);
	};

	getState = () => {
		// console.log('GET STATE');
		const jsonState = sessionStorage.getItem('state');

		if (!this.existsState()) {
			return {};
		}

		return JSON.parse(jsonState);
	};

	existsState = () => {
		const jsonState = sessionStorage.getItem('state');
		// console.log('STATE CHECK', jsonState);

		if (jsonState === null) {
			return false;
		}

		return true;
	};

	getStateForVisual = () => {
		switch (this.state.visualType) {
			case visualTypeEnum.MAP:
				return this.state.mapUS;
			case visualTypeEnum.BAR_GRAPH:
				return this.state.lineChart;
			case visualTypeEnum.PIE_CHART:
				return this.state.pieChart;
			default:
				return {};
		}
	};
}

const initialState = {
	visualType: visualTypeEnum.MAP,
	lineChart: {
		inputData: {
			bucketType: 'time',
			valueType: 'count',
			timeChart: {
				bucketSize: 'month',
			},
		},
		fetchedData: {
			data: [200, 157, 215, 186, 190],
			labels: [
				"Feb '16",
				"Mar '16",
				"Apr '16",
				"May '16",
				"Jun '16",
			],
		},
	},
	pieChart: {
		inputData: {
			bucketType: 'column',
			bucketColumn: 'severity',
			joinBucketsPast: 6,
			valueType: 'count',
		},
		fetchedData: {
			data: [45, 15, 35, 5],
			labels: [
				'Speed limit',
				'Alchool',
				'Sleeping driver',
				'Others',
			],
		},
	},
	mapUS: {
		inputData: {
			bucketType: 'column',
			bucketColumn: 'state',
			valueType: 'count',
		},
		fetchedData: {
			data: [],
			labels: [],
		},
	},
};

export default new StateManager();