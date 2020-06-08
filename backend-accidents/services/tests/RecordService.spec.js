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
		source: 'WebMasters',
		tmc: 201,
		severity: 3,
		startTime: 1454910360000,
		endTime: 1454929200000,
		startLat: 39.865147,
		startLong: -84.058723,
		distance: 0.01,
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
		weatherTimestamp: 1454911080000,
		temperature: 36.9,
		humidity: 91,
		pressure: 29.68,
		visibility: 10,
		windDirection: 'calm',
		precipitation: 0.02,
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
	console.log(JSON.stringify(testAccident, null, 2));
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRlOWExNWUzYTI5OTIzOTBjNDJhYjkiLCJpYXQiOjE1OTE2NDY3NDF9.GyGG0obU1_yCXyCK7QQkz9CF9lO1cooP_lWHM1fJseU';
});
