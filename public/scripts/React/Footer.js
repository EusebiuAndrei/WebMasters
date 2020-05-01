const Footer = ()=>{

    return `
     <div class="container__footer">

            <div class ="footer-container">

                <p class="footer-container__txtlogo">AVi</p>
                        
                    <section class ="footer-container__text">
        
                        <p class="footer-container__text__children">Link One</p>
                        
                        <p class="footer-container__text__children">Link Two</p>
        
                        <p class="footer-container__text__children">Link Three</p>

                        <p class="footer-container__text__children">Link Four</p>
        
                    </section>

                    <section class="footer-container__media">

                         
                    <a href="#" class="footer-container__media__buttons" > <img src="../images/social-twit.png" alt="tw icon"></a>
                    <a href="#" class="footer-container__media__buttons"> <img  src="../images/pngwave.png" alt="insta icon"></a>
                    <a href="#" class="footer-container__media__buttons" > <img src="../images/facebook.png" alt="fb icon"></a>

                    </section>
                
                  

                </div>
                <p>&copy AVi 2020</p>
        </div>
        `;

};

const addEventsListeners = () => {};

export default Footer;
export { addEventsListeners };
