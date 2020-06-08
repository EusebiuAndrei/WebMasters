import { visualTypeEnum } from '../constants.js';

class StateManager {
	state = initialState;

	constructor() {
		if (this.existsState()) {
			this.state = this.getState();
			return;
		}
		this.setState({});
	}

	setState = (payload) => {
		this.state = { ...this.state, ...payload };
		const jsonState = JSON.stringify(this.state);
		sessionStorage.setItem('state', jsonState);
	};

	getState = () => {
		const jsonState = sessionStorage.getItem('state');
		if (!this.existsState()) {
			return {};
		}
		return JSON.parse(jsonState);
	};

	existsState = () => {
		const jsonState = sessionStorage.getItem('state');
		return jsonState !== null;
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
			data: [
				{
					name: 'Accidents',
					data: [
						5425,
						18088,
						17610,
						30527,
						45759,
						56425,
						54664,
						55628,
						65010,
						59568,
						55680,
						51640,
						57283,
						48087,
						41106,
						46221,
						43225,
						80872,
						76818,
						74903,
						70073,
						71575,
						75004,
						71468,
						74418,
						72588,
						76476,
						67781,
						65743,
						76379,
						73282,
						87192,
						82079,
						70205,
						79275,
						74556,
						69396,
						73000,
						73868,
						65496,
						68232,
						75236,
						87666,
						106802,
						81893,
						95536,
					],
				},
			],
			labels: [
				'3/2016',
				'4/2016',
				'5/2016',
				'6/2016',
				'7/2016',
				'8/2016',
				'9/2016',
				'10/2016',
				'11/2016',
				'12/2016',
				'1/2017',
				'2/2017',
				'3/2017',
				'4/2017',
				'5/2017',
				'6/2017',
				'7/2017',
				'8/2017',
				'9/2017',
				'10/2017',
				'11/2017',
				'12/2017',
				'1/2018',
				'2/2018',
				'3/2018',
				'4/2018',
				'5/2018',
				'6/2018',
				'7/2018',
				'8/2018',
				'9/2018',
				'10/2018',
				'11/2018',
				'12/2018',
				'1/2019',
				'2/2019',
				'3/2019',
				'4/2019',
				'5/2019',
				'6/2019',
				'7/2019',
				'8/2019',
				'9/2019',
				'10/2019',
				'11/2019',
				'12/2019',
			],
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
			data: [
				{
					name: 'Accidents',
					data: [
						5425,
						18088,
						17610,
						30527,
						45759,
						56425,
						54664,
						55628,
						65010,
						59568,
						55680,
						51640,
						57283,
						48087,
						41106,
						46221,
						43225,
						80872,
						76818,
						74903,
						70073,
						71575,
						75004,
						71468,
						74418,
						72588,
						76476,
						67781,
						65743,
						76379,
						73282,
						87192,
						82079,
						70205,
						79275,
						74556,
						69396,
						73000,
						73868,
						65496,
						68232,
						75236,
						87666,
						106802,
						81893,
						95536,
					],
				},
			],
			labels: [
				'3/2016',
				'4/2016',
				'5/2016',
				'6/2016',
				'7/2016',
				'8/2016',
				'9/2016',
				'10/2016',
				'11/2016',
				'12/2016',
				'1/2017',
				'2/2017',
				'3/2017',
				'4/2017',
				'5/2017',
				'6/2017',
				'7/2017',
				'8/2017',
				'9/2017',
				'10/2017',
				'11/2017',
				'12/2017',
				'1/2018',
				'2/2018',
				'3/2018',
				'4/2018',
				'5/2018',
				'6/2018',
				'7/2018',
				'8/2018',
				'9/2018',
				'10/2018',
				'11/2018',
				'12/2018',
				'1/2019',
				'2/2019',
				'3/2019',
				'4/2019',
				'5/2019',
				'6/2019',
				'7/2019',
				'8/2019',
				'9/2019',
				'10/2019',
				'11/2019',
				'12/2019',
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
			data: [
				{
					name: 'Accidents',
					data: [663204, 298062, 223746, 146689, 142460, 137799, 1362375],
				},
			],
			labels: ['CA', 'TX', 'FL', 'SC', 'NC', 'NY', 'other'],
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
					name: 'Accidents',
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
