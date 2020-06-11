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

const addEventsListeners = () => {};

export default CardContainer;
export { addEventsListeners };

const founders = [
	{
		name: 'Gagea Eusebiu-Andrei',
		description:
			'Surprisingly, beyond all odds, actually likes front-end. Pretty handy with JavaScript.',
		role: 'https://github.com/EusebiuAndrei',
		imgUrl: '../images/web-eusebiu.jpg',
	},
	{
		name: 'Tudor Iacobescu',
		description:
			'Likes UX/UI, but not front-end. Feels comfortable behind the scenes.',
		role: 'https://github.com/limelier',
		imgUrl: '../images/web-tudor.jpg',
	},
	{
		name: 'Bîcu Daniel',
		description:
			"Uses tabs instead of spaces, but he claims it's by accident.",
		role: 'https://github.com/DanBicu',
		imgUrl: '../images/web-daniel.jpg',
	},
];
