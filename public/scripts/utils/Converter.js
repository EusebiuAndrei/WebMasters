export const conv = {
	str: (str) => str,
	num: (str) => {
		if (isNaN(str)) {
			throw Error(`Cannot convert '${str}' to a number!`);
		}

		return +str;
	},
	bool: (str) => {
		str = str.toLowerCase();
		if (str === 'true') {
			return true;
		} else if (str === 'false') {
			return false;
		} else {
			throw Error(`Cannot convert '${str}' to a boolean!`);
		}
	},
	date: (str) => {
		const date = new Date(str);
		if (isNaN(date.valueOf())) {
			throw Error(`Cannot convert '${str}' to a date!`);
		}
		return date;
	},
};

export const columnTypes = {
	source: 'str',
	tmc: 'num',
	severity: 'num',
	startTime: 'date',
	endTime: 'date',
	startLat: 'num',
	startLng: 'num',
	endLat: 'num',
	endLng: 'num',
	distance: 'num',
	desc: 'str',
	number: 'num',
	street: 'str',
	side: 'str',
	city: 'str',
	county: 'str',
	state: 'str',
	zipcode: 'str',
	timezone: 'str',
	airportCode: 'str',
	weatherTimestamp: 'date',
	temperature: 'num',
	windChill: 'num',
	humidity: 'num',
	pressure: 'num',
	visibility: 'num',
	windDirection: 'str',
	windSpeed: 'num',
	precipitation: 'num',
	weatherCondition: 'num',
	amenity: 'bool',
	bump: 'bool',
	crossing: 'bool',
	giveWay: 'bool',
	junction: 'bool',
	noExit: 'bool',
	railway: 'bool',
	roundabout: 'bool',
	station: 'bool',
	stop: 'bool',
	trafficCalming: 'bool',
	trafficSignal: 'bool',
	turningLoop: 'bool',
	sunriseSunsetNight: 'bool',
	civilTwilightNight: 'bool',
	nauticalTwilightNight: 'bool',
	astronomicalTwilightNight: 'bool',
};

function strToArr(str) {
	return str.split(',').map((elem) => elem.trim());
}

export function convertArr(column, text) {
	// return arr.map(conv[columnTypes[column]]);
	return strToArr(text).map(conv[columnTypes[column]]);
}

// const arrayText = '2017-12-31T22:04:20Z, 5/3/2018';
// const converted = convertArr('weatherTimestamp', arrayText);

// console.log(converted);
