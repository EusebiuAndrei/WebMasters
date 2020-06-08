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
			case visualTypeEnum.LINE_CHART:
				return this.state.lineChart;
			case visualTypeEnum.BAR_GRAPH:
				return this.state.barChart;
			case visualTypeEnum.PIE_CHART:
				return this.state.pieChart;
			default:
				return {};
		}
	};

	getStateByVisualType = (visualType) => {
		switch (visualType) {
			case visualTypeEnum.MAP:
				return this.state.mapUS;
			case visualTypeEnum.LINE_CHART:
				return this.state.lineChart;
			case visualTypeEnum.BAR_GRAPH:
				return this.state.barChart;
			case visualTypeEnum.PIE_CHART:
				return this.state.pieChart;
			default:
				return {};
		}
	};

	setFetchedData = (payload) => {
		switch (this.state.visualType) {
			case visualTypeEnum.MAP:
				this.state.mapUS.fetchedData = payload;
				break;
			case visualTypeEnum.LINE_CHART:
				this.state.lineChart.fetchedData = payload;
				break;
			case visualTypeEnum.BAR_GRAPH:
				this.state.barChart.fetchedData = payload;
				break;
			case visualTypeEnum.PIE_CHART:
				this.state.pieChart.fetchedData = payload;
				break;
			default:
				break;
		}

		this.setState(this.state);
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
			data: [{ name: 'Line Chart', data: [200, 157, 215, 186, 190] }],
			labels: ["Feb '16", "Mar '16", "Apr '16", "May '16", "Jun '16"],
		},
	},
	barChart: {
		inputData: {
			bucketType: 'time',
			valueType: 'count',
			timeChart: {
				bucketSize: 'month',
			},
		},
		fetchedData: {
			data: [{ name: 'Bar Chart', data: [200, 157, 215, 186, 190] }],
			labels: ["Feb '16", "Mar '16", "Apr '16", "May '16", "Jun '16"],
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
			data: [{ name: 'Pie Chart', data: [45, 15, 35, 5] }],
			labels: ['Speed limit', 'Alcohol', 'Sleeping driver', 'Others'],
		},
	},
	mapUS: {
		inputData: {
			bucketType: 'column',
			bucketColumn: 'state',
			valueType: 'count',
		},
		fetchedData: {
			data: [
				{
					name: 'Map',
					data: [
						663204,
						298062,
						223746,
						146689,
						142460,
						137799,
						90395,
						88694,
						86390,
						83620,
						79957,
						70840,
						62727,
						62330,
						61367,
						58289,
						55863,
						52481,
						51297,
						49942,
						43328,
						41385,
						40124,
						36369,
						33014,
						30040,
						29012,
						22803,
						22505,
						19122,
						17580,
						10483,
						10346,
						9524,
						7064,
						6887,
						5961,
						5020,
						4434,
						3653,
						2274,
						2065,
						1757,
						1749,
						585,
						504,
						492,
						60,
						43,
					],
				},
			],
			labels: [
				'CA',
				'TX',
				'FL',
				'SC',
				'NC',
				'NY',
				'PA',
				'MI',
				'IL',
				'GA',
				'VA',
				'OR',
				'MN',
				'AZ',
				'WA',
				'TN',
				'OH',
				'LA',
				'OK',
				'NJ',
				'MD',
				'UT',
				'CO',
				'AL',
				'MA',
				'IN',
				'MO',
				'CT',
				'NE',
				'KY',
				'WI',
				'RI',
				'IA',
				'NV',
				'NH',
				'KS',
				'MS',
				'NM',
				'DE',
				'DC',
				'WV',
				'ME',
				'ID',
				'AR',
				'VT',
				'MT',
				'WY',
				'SD',
				'ND',
			],
		},
	},
};

export default new StateManager();
