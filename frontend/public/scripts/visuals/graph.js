import { randomColor } from '../utils/index.js';

export const initializeGraph = ({ data, labels }) => {
	const ctx = document.getElementById('chart');
	const chart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels,
			datasets: [
				...data.map((dataset) => ({
					label: dataset.name,
					data: dataset.data,
					...randomColor(),
				})),
			],
		},
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
			maintainAspectRatio: false,
			legend: false,
			layout: {
				padding: {
					left: 20,
					right: 30,
					top: 20,
					bottom: 10,
				},
			},
		},
	});
};
