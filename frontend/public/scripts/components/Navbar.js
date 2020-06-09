const Navbar = () => {
	return `
        <div class="container__header">
            <section class ="navbar-container">
                <a href="http://localhost:3000/"><img src="../images/scar.png" alt="logo" class="navbar-container__img"></a>
                <section class ="navbar-container__text">
                    <p class="navbar-container__text__children"><a href="#about-us">Our team</a></p>
					<p class="navbar-container__text__children"><a href="/help">Usage guide (RO)</a></p>
                </section>
                <p class="navbar-container__text__children"><a class="button" href="/tool">Tool</a></p>
            </section>
        </div>
    `;
};

const addEventsListeners = () => {};

export default Navbar;
export { addEventsListeners };
