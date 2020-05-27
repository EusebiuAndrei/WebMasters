const Export = () => {
	return `
            <div class="export-container">
                <label>Export as
                    <select id="exportType" style="display: block;">
                        <option value="pdf">PDF</option>
                        <option value="png">PNG</option>
                        <option value="csv">CSV</option>
                    </select>
                </label>

                <input type="button" id="downloadBtn" value="Download">

                <p>Send Email</p>
            </div> 
        `;
};

const addEventsListeners = () => {
	const exportList = document.getElementById('exportType');
	const dwnButton = document.getElementById('downloadBtn');

	if (dwnButton) {
		dwnButton.addEventListener('click', (event) => {
			var selectedValue = exportList.options[exportList.selectedIndex].value;
			if (selectedValue == 'csv') {
				alert('csv!');
			} else if (selectedValue == 'pdf') {
				var pie = false;
				var describeTxt = document.getElementsByClassName(
					'bar_graph__header__title',
				)[0];

				if (describeTxt) describeTxt = describeTxt.textContent;

				console.log(describeTxt);
				var toExport = document.querySelector('#chart');
				if (toExport == null) {
					toExport = document.querySelector('#pieChart');
					pie = true;
				}
				var canvasImage = toExport.toDataURL('image/png', 1.0);

				var exportedDoc = new jsPDF('landscape');
				exportedDoc.setFontSize(10);

				exportedDoc.text(15, 12, describeTxt ? describeTxt : '');

				if (pie) exportedDoc.addImage(canvasImage, 'PNG', 10, 10, 200, 150);
				else exportedDoc.addImage(canvasImage, 'PNG', 10, 10, 280, 150);

				exportedDoc.save('chart.pdf');
			} else if (selectedValue == 'png') {
				alert('png!');
			}
		});
	}
};

export default Export;
export { addEventsListeners };
