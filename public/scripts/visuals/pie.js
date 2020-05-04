export const initializePieChart = ({ data, labels }) => {
	var pie = document.getElementById('pieChart');

	let colors = ['#E9967A', '#87CEFA', '#FAFAD2', '#3CB371'];

	var myPie = new Chart(pie, {
		type: 'pie',
		data: {
			datasets: [
				{
					data,
					backgroundColor: [
						colors[0],
						colors[1],
						colors[2],
						colors[3],
					],
					borderColor: '#5090BE',
				},
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
