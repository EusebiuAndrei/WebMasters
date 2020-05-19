import statesData from './us-states.js';
import { statesHash } from '../constants.js';

export const intializeMap = ({ labels, data } = {}) => {
	console.log(labels);
	console.log(data[0].data);

	// get some data
	const states = statesData.features.map((feature) => {
		const abv = statesHash.find(
			(stateHash) => stateHash.name === feature.properties.name,
		);
		let value = 0;

		if (abv) {
			const indexOfAbv = labels.indexOf(abv.abbreviation);

			if (indexOfAbv > -1) {
				value = data[0].data[indexOfAbv];
			}
		}

		return {
			name: feature.properties.name,
			numberOfCrimes: value,
		};
	});

	// Set boundaries for color selection
	let sum, min, max, avg, avgMin, avgMax;
	sum = min = max = states[0].numberOfCrimes;
	for (let i = 1; i < states.length; i++) {
		sum += states[i].numberOfCrimes;

		if (states[i].numberOfCrimes < min) {
			min = states[i].numberOfCrimes;
		}
		if (states[i].numberOfCrimes > max) {
			max = states[i].numberOfCrimes;
		}
	}
	avg = sum / states.length;
	avgMin = (min + avg) / 2;
	avgMax = (avg + max) / 2;
	// ====================================

	var mapboxAccessToken =
		'pk.eyJ1IjoiY2hyaXM5OTQ1IiwiYSI6ImNrOGtleXBicjAxMGgzbXFoZXJ0Zzk4ZnkifQ.Kr18bWBCkThXnXa4tCGZbA';
	var map = L.map('map').setView([37.8, -96], 4);

	L.tileLayer(
		'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
			mapboxAccessToken,
		{
			id: 'mapbox/light-v9',
			//attribution: ...,
			tileSize: 512,
			zoomOffset: -1,
		},
	).addTo(map);

	var geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature,
	}).addTo(map);

	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function (props) {
		this._div.innerHTML =
			'<h4>US Population Density</h4>' +
			(props
				? '<b>' + props.name + '<br />' + props.numberOfCrimes + ' crimes'
				: 'Hover over a state');
	};

	info.addTo(map);

	function style(feature) {
		return {
			fillColor: getColor(
				states.find((state) => state.name === feature.properties.name)
					.numberOfCrimes,
			),
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
		};
	}
	// #FC4E2A #FD8D3C #FEB24C #FED976
	function getColor(d) {
		return d > avgMax
			? '#800026'
			: d > avg
			? '#BD0026'
			: d > avgMin
			? '#FC4E2A'
			: '#FEB24C';
	}

	// Adding interaction

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7,
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		const state = states.find(
			(state) => state.name === layer.feature.properties.name,
		);
		info.update(state);
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target);

		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature,
		});
	}

	// Custom Info Control
};
