import { generateNRandColors } from '../utils/index.js';

export const initializePieChart = ({ data, labels }) => {
	var pie = document.getElementById('pieChart');

	let colors = ['#E9967A', '#87CEFA', '#FAFAD2', '#3CB371'];
	console.log(generateNRandColors(3));

	var myPie = new Chart(pie, {
		type: 'pie',
		data: {
			datasets: [
				...data.map((dataset) => ({
					label: dataset.name,
					data: dataset.data,
					backgroundColor: [...generateNRandColors(dataset.data.length)],
					borderColor: '#5090BE',
				})),
			],

			labels,
		},

		options: {
			responsive: true,
			legend: {
				display: true,
				position: 'bottom',

				labels: {
					fontColor: 'rgb(240,248,255)',
				},
			},
		},
	});
};
