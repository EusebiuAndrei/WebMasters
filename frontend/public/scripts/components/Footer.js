const Footer = () => {
	return `
	<div class="container__footer">
		<div class ="footer-container">
			<a href="/" class="footer-container__txtlogo">AVi</a>
			<div class ="footer-container__text">
				<a class="footer-container__text__link" href="https://github.com/EusebiuAndrei/WebMasters?fbclid=IwAR2Fl0EMIOE5SiHdBAGeWWetPoBOaPG0EaJ6GDHlBcwZiGGRiDUS8n8j7e8">
				Github
				</a>
				<a class="footer-container__text__link" href="https://profs.info.uaic.ro/~andrei.panu/">
				Coordinating professor
				</a>
				<a class="footer-container__text__link" href="https://www.kaggle.com/sobhanmoosavi/us-accidents">
				Data source
				</a>
				<a class="footer-container__text__link" href="#">
				Public API documentation
				</a>
				<a class="footer-container__text__link" href="/docs">
				Project documentation
				</a>

			</div>
		</div>
		<div class="container__footer__citations">
			<p>
			Moosavi, Sobhan, Mohammad Hossein Samavatian, Srinivasan Parthasarathy, and Rajiv Ramnath. “A Countrywide Traffic Accident Dataset.”, 2019
			</p>
			<p>
			Moosavi, Sobhan, Mohammad Hossein Samavatian, Srinivasan Parthasarathy, Radu Teodorescu, and Rajiv Ramnath. "Accident Risk Prediction based on Heterogeneous Sparse Data: New Dataset and Insights." In proceedings of the 27th ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems, ACM, 2019. 
			</p>
		</div>
	</div>
	`;
};

const addEventsListeners = () => {
};

export default Footer;
export { addEventsListeners };
