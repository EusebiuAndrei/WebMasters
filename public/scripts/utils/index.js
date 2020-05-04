import StateManager from './StateManager.js';

const getDomStringFromArray = (elements) => {
	let elementsString = '';
	elements.forEach((element) => (elementsString += element));

	return elementsString;
};

const getDomElementFromDomString = (domString) => {
	const domElement = document.createElement('div');
	domElement.innerHTML = domString;

	return domElement.children[0];
};

const createStateEvent = (payload) => {
	return new CustomEvent('statechange', {
		detail: payload,
	});
};

export {
	getDomStringFromArray,
	getDomElementFromDomString,
	createStateEvent,
};
