export const initializeGraph = ({ data, labels }) => {
	const ctx = document.getElementById('chart');
	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels,
			datasets: [
				{
					data,
					backgroundColor: '#5090BE50',
					borderColor: '#5090BE',
				},
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
