import { visualTypeEnum } from '../constants.js';

class StateManager {
	state = {
		visualType: visualTypeEnum.MAP,
	};

	constructor() {
		// console.log('CONSTRUCTOR', this.existsState());

		if (this.existsState()) {
			this.state = this.getState();
			// console.log('WOW', this.state);
			return;
		}

		this.setState({});
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
}

export default new StateManager();
