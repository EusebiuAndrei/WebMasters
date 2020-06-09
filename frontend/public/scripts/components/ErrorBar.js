const ErrorBar = ({ datasetName, errMsg }) => {
	return `
        <div class="error-bar" id="js-error-bar">
            <h2>Error</h2>
            <p>There was a problem with the dataset: <strong>${datasetName}</strong></p>
            <p>${errMsg}</p>
        </div>
    `;
};

const addEventsListeners = () => {};

export default ErrorBar;
export { addEventsListeners };
