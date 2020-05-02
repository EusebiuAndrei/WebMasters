import * as Greeter from './Greeter.js';
import * as Map from './Map.js';
import * as ListExample from './ListExample.js';

const App = () => {
	return `
            ${Map.default()}
            ${ListExample.default()}
        `;
};

const initiateEventListeners = () => {
	ListExample.addEventsListeners();
	Greeter.addEventsListeners();
	Map.addEventsListeners();
};

export default App;
export { initiateEventListeners };
