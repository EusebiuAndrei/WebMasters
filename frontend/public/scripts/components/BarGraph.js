const BarGraph = () => {
	return `
        <div class="container__bar bar_graph">
            <div class="bar_graph__content" id="chart_container">
                <canvas id="chart"></canvas>
            </div>
        </div>
    `;
};

const addEventsListeners = () => {
};

export default BarGraph;
export { addEventsListeners };
