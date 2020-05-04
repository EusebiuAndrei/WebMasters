import statesData from './us-states.js';

export const intializeMap = () => {
	// get some data
	const states = statesData.features.map((feature) => ({
		name: feature.properties.name,
		numberOfCrimes: Math.round(Math.random() * 3000),
	}));
	// console.log(states); !!!
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
				? '<b>' +
				  props.name +
				  '<br />' +
				  props.numberOfCrimes +
				  ' crimes'
				: 'Hover over a state');
	};

	info.addTo(map);

	function style(feature) {
		return {
			fillColor: getColor(
				states.find(
					(state) => state.name === feature.properties.name,
				).numberOfCrimes,
			),
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
		};
	}

	function getColor(d) {
		return d > 1000
			? '#800026'
			: d > 500
			? '#BD0026'
			: d > 200
			? '#E31A1C'
			: d > 100
			? '#FC4E2A'
			: d > 50
			? '#FD8D3C'
			: d > 20
			? '#FEB24C'
			: d > 10
			? '#FED976'
			: '#FFEDA0';
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
