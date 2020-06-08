const Card = ({ name, description, role, imgUrl } = {}) => {
	return `
        <article class = "card card-container__item">
            <img src=${
		imgUrl ? imgUrl : 'https://www.w3schools.com/howto/img_avatar.png'
	} alt="image of developer" class="card__imageProfile">
            <p class="card__title">${name}</p>
            <section class="card__content">${description}</section>
            <p class="card__position">${role}</p>
        </article>
    `;
};

const addEventsListeners = () => {
};

export default Card;
export { addEventsListeners };
