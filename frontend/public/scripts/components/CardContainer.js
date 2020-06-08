import Card from './Card.js';
import { getDomStringFromArray } from '../utils/index.js';

const CardContainer = () => {
	const cards = founders.map((founder) => Card(founder));

	return `
		<section class="cards" id="about-us">
			<h2 class="cards-title">Our team</h2>
            <section class="card-container">
                ${getDomStringFromArray(cards)}
            </section>
        </section>
    `;
};

const addEventsListeners = () => {
};

export default CardContainer;
export { addEventsListeners };

const founders = [
	{
		name: 'Gagea Eusebiu-Andrei',
		description:
			'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
		role: 'Fullstack developer',
	},
	{
		name: 'Tudor Iacobescu',
		description:
			'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
		role: 'Fullstack developer',
	},
	{
		name: 'Bicu Daniel',
		description:
			'The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
		role: 'Fullstack developer',
	},
];
