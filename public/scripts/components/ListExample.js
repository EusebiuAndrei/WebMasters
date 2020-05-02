import {
	getDomStringFromArray,
	getDomElementFromDomString,
} from '../utils/index.js';
import Greeter from './Greeter.js';

const ListExample = ({ data = ['one', 'two'] } = {}) => {
	const printData = data.map((elem) => `<p>${elem}</p>`);

	return `
			<div id="list-example">
				<ul>
					${getDomStringFromArray(printData)}
				</ul>
				<button>Click me</button>
				${Greeter({ name: 'Andrei', salute: 'Hello' })}
			</div>
        `;
};

const addEventsListeners = () => {
	const root = document.getElementById('list-example');
	const button = root.getElementsByTagName('button')[0];

	root.addEventListener('statechange', function (event) {
		update(event.detail);
	});

	button.addEventListener('click', (event) => {
		event.preventDefault();

		alert('Hello');
	});
};

const update = (payload) => {
	const currentElement = document.getElementById('list-example');
	const nestElement = getDomElementFromDomString(
		ListExample(payload),
	);

	currentElement.replaceWith(nestElement);
	addEventsListeners();
};

export default ListExample;
export { addEventsListeners };
