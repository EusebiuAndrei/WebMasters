const Export = () => {
	return `
            <div class="export-container">
                <label>Export as
                    <select style="display: block;">
                        <option value="pdf">PDF</option>
                        <option value="png">PNG</option>
                        <option value="csv">CSV</option>
                    </select>
                </label>

                <p>Download</p>

                <p>Send Email</p>
            </div>
        `;
};

const addEventsListeners = () => {};

export default Export;
export { addEventsListeners };
