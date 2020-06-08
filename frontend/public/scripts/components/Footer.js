const Footer = () => {
	return `
        <div class="container__footer">
            <div class ="footer-container">
                <p class="footer-container__txtlogo"><a href="http://localhost:3000/">AVi</a></p>
                <section class ="footer-container__text">
                    <p class="footer-container__text__children"><a href="/tool">Tool</a></p>
                    <p class="footer-container__text__children"><a href="#about-us">Team</a></p>
                    <p class="footer-container__text__children"><a href="#">Documentation</a></p>
                    <p class="footer-container__text__children"><a href="https://github.com/EusebiuAndrei/WebMasters?fbclid=IwAR2Fl0EMIOE5SiHdBAGeWWetPoBOaPG0EaJ6GDHlBcwZiGGRiDUS8n8j7e8" target="_blank">Github</a></p>
                </section>
                <section class="footer-container__media">
                <a href="#" class="footer-container__media__buttons" > <img src="../images/twitter.png" alt="twitter icon"></a>
                <a href="#" class="footer-container__media__buttons"> <img  src="../images/instagram.png" alt="instagram icon"></a>
                <a href="#" class="footer-container__media__buttons" > <img src="../images/facebook.png" alt="facebook icon"></a>
                </section>
            </div>
            <p>&copy AVi 2020</p>
        </div>
        `;
};

const addEventsListeners = () => {};

export default Footer;
export { addEventsListeners };
