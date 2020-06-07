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

const randRgbNumber = () => Math.floor(Math.random() * 256);

const randRgba = (r, g, b, o) => `rgba(${r}, ${g}, ${b}, ${o})`;

export const randomColor = () => {
	const r = randRgbNumber();
	const g = randRgbNumber();
	const b = randRgbNumber();

	return {
		borderColor: randRgba(r, g, b, 1),
		backgroundColor: randRgba(r, g, b, 0.5),
	};
};

export const generateNRandColors = (n) => {
	let colors = [];

	for (let i = 0; i < n; i++) {
		colors.push(randomColor().borderColor);
	}

	return colors;
};

export const eventApplyForm = new Event('applyForm');

export { getDomStringFromArray, getDomElementFromDomString, createStateEvent };
