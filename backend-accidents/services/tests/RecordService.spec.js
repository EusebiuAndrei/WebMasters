const mongoose = require('mongoose');

const config = require('../../config');
const { recordService } = require('../index');
const { Accidents } = require('../../models/index');

describe('Record service', () => {
	beforeAll(async () => {
		await mongoose.connect(config.databaseTestURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		await Accidents.deleteMany({});
	});

	const testAccident = {
		source: 'MapQuest',
		tmc: { $numberInt: '201' },
		severity: { $numberInt: '3' },
		startTime: { $date: { $numberLong: '1454910360000' } },
		endTime: { $date: { $numberLong: '1454929200000' } },
		startLat: { $numberDouble: '39.865147' },
		startLng: { $numberDouble: '-84.058723' },
		distance: { $numberDouble: '0.01' },
		desc:
			'Right lane blocked due to accident on I-70 Eastbound at Exit 41 OH-235 State Route 4.',
		street: 'I-70 E',
		side: 'R',
		city: 'Dayton',
		county: 'Montgomery',
		state: 'OH',
		zipcode: '45424',
		timezone: 'US/Eastern',
		airportCode: 'KFFO',
		weatherTimestamp: { $date: { $numberLong: '1454911080000' } },
		temperature: { $numberDouble: '36.9' },
		humidity: { $numberInt: '91' },
		pressure: { $numberDouble: '29.68' },
		visibility: { $numberInt: '10' },
		windDirection: 'calm',
		precipitation: { $numberDouble: '0.02' },
		weatherCondition: 'Light Rain',
		amenity: false,
		bump: false,
		crossing: false,
		giveWay: false,
		junction: false,
		noExit: false,
		railway: false,
		roundabout: false,
		station: false,
		stop: false,
		trafficCalming: false,
		trafficSignal: false,
		turningLoop: false,
		sunriseSunsetNight: true,
		civilTwilightNight: true,
		nauticalTwilightNight: true,
		astronomicalTwilightNight: true,
	};
});
