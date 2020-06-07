const mongoose = require('mongoose');

const accidentSchema = mongoose.Schema(
    {
        source: {
            type: String,
            required: true,
        },
        tmc: {
            type: Number,
            min: 1,
            max: 2047,
        },
        severity: {
            type: Number,
            min: 1,
            max: 4,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        startLat: {
            type: Number,
            min: -90.0,
            max: 90.0,
            required: true,
        },
        startLong: {
            type: Number,
            min: -180.0,
            max: 180.0,
            required: true,
        },
        endLat: {
            type: Number,
            min: -90.0,
            max: 90.0,
        },
        endLong: {
            type: Number,
            min: -180.0,
            max: 180.0,
        },
        distance: {
            type: Number,
            min: 0,
            required: true,
        },
        description: String,
        number: {
            type: Number,
            min: 0,
        },
        street: {
            type: String,
            required: true,
        },
        side: {
            type: String,
            enum: ['L', 'R'],
        },
        city: String,
        county: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            // enum includes all 50 states, DC, and eight insular areas (American Samoa, etc)
            // not all state abbreviations used in dataset
            enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
            required: true,
        },
        zipcode: {
            type: String,
            matches: /\d+(-\d+)?/,
            required: true,
        },
        timezone: {
            type: String,
            // only first 4 present in dataset, others added for future data support
            enum: [
                'US/Eastern',
                'US/Pacific',
                'US/Central',
                'US/Mountain',
                'Alaska',
                'Hawaii-Aleutian',
                'Samoa',
                'Chamorro',
                'Atlantic',
            ]
        },
        airportCode: {
            type: String,
            matches: /[A-Z0-9]{4}/,
        },
        weatherTimestamp: Date,
        temperature: Number,
        windChill: Number,
        humidity: {
            type: Number,
            min: 0,
            max: 100,
        },
        pressure: {
            type: Number,
            min: 0,
        },
        visibility: {
            type: Number,
            min: 0,
        },
        windDirection: {
            type: String,
            enum: ['calm', 'var', 'N', 'S', 'E', 'W', 'NW', 'NE', 'SW', 'SE', 'NNW', 'NNE', 'WNW', 'WSW', 'ENE', 'ESE', 'SSW', 'SSE'],
        },
        windSpeed: {
            type: Number,
            min: 0,
        },
        precipitation: {
            type: Number,
            min: 0,
        },
        weatherCondition: {
            type: String,
            // technically enum-able, but there are SO many of them
        },
        amenity: {
            type: Boolean,
            required: true,
        },
        bump: {
            type: Boolean,
            required: true,
        },
        crossing: {
            type: Boolean,
            required: true,
        },
        giveWay: {
            type: Boolean,
            required: true,
        },
        junction: {
            type: Boolean,
            required: true,
        },
        noExit: {
            type: Boolean,
            required: true,
        },
        railway: {
            type: Boolean,
            required: true,
        },
        roundabout: {
            type: Boolean,
            required: true,
        },
        station: {
            type: Boolean,
            required: true,
        },
        stop: {
            type: Boolean,
            required: true,
        },
        trafficCalming: {
            type: Boolean,
            required: true,
        },
        trafficSignal: {
            type: Boolean,
            required: true,
        },
        turningLoop: {
            type: Boolean,
            required: true,
        },
        sunriseSunsetNight: Boolean,
        civilTwilightNight: Boolean,
        nauticalTwilightNight: Boolean,
        astronomicalTwilightNight: Boolean,
    }
)

module.exports = accidentSchema;