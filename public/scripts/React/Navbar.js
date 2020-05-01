const Navbar = () => {

    return `
    
    <div class="container__header">
            
        <section class ="navbar-container">

            <img src="../images/scar.png" alt="logo" class="navbar-container__img">


                
            <section class ="navbar-container__text">

                <p class="navbar-container__text__children">Map</p>
                
                <p class="navbar-container__text__children">Statistics</p>

                <p class="navbar-container__text__children">Reports</p>

            </section>

            <div class="navbar-container__hamburger">
                
                <span></span>
                <span></span>
                <span></span>
                
            </div>


            <input class="navbar-container__input input input--search" placeholder="Search"></input>

            <div class="navbar-container__dropdown">
            <button class="navbar-container__dropdown__button">></button>
    
            <a class = "navbar-container__dropdown__link" href="#">About us</a>
    
            </div>
          
        
        </section>

       
            <!-- <input placeholder="email" class="input">
            <input placeholder="phone number" class="input"> -->
        </div>
    `;


};

const addEventsListeners = () => {};

export default Navbar;
export { addEventsListeners };

