export const initializeGraph = () => {
	const ctx = document.getElementById('chart');
	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: [
				"Feb '16",
				"Mar '16",
				"Apr '16",
				"May '16",
				"Jun '16",
			],
			datasets: [
				{
					data: [200, 157, 215, 186, 190],
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
