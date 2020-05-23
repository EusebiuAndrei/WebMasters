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
				var exportedDoc = new jsPDF();

				exportedDoc.save('chart.pdf');

				alert('pdf!');
			} else if (selectedValue == 'png') {
				alert('png!');
			}
		});
	}
};

export default Export;
export { addEventsListeners };
