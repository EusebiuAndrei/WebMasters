const Navbar = () => {
	return `
        <div class="container__header">
            <section class ="navbar-container">
                <img src="../images/scar.png" alt="logo" class="navbar-container__img">
                <section class ="navbar-container__text">
                    <p class="navbar-container__text__children"><a href="#map">Map</a></p>
                    <p class="navbar-container__text__children"><a href="#about-us">About us</a></p>
                    <p class="navbar-container__text__children"><a href="#map">Documentation</a></p>
                </section>
                <p class="navbar-container__text__children"><a class="button" href="/tool">Tool</a></p>
            </section>
        </div>
    `;
};

const addEventsListeners = () => {};

export default Navbar;
export { addEventsListeners };
