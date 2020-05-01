import {
	getDomStringFromArray,
	getDomElementFromDomString,
} from './utils.js';

const obj = {
    
    location: "Near hospital",
    date: "13 aug 2018",
    phone: "251-661-532",
    city: "New York"
    
};

const obj2 = {

    location: "Around 3th street",
    date: "13 aug 2018",
    phone: "251-661-5362",
    city: "San Francisco"
    
};

const Reports = ({ data = [obj, obj2, obj, obj2, obj] } = {}) => {
	const printData = data.map((elem) => `  <article class="reports reports-container__children">
    <p class="reports__content reports__heads">${elem.location}</p>

    <p class="reports__content reports__dissapear"> ${elem.date} <span class="separator">
            Date </span> </p>
    <p class="reports__content reports__dissapear">${elem.phone} <span class="separator">
            Caller telephone </span></p>

    <p class="reports__content">${elem.city} <span class="separator">
            Location </span></p>

    <button class="reports__dissapear button button--danger reports__buttons">Medium</button>
    <button class="button button--secondary reports__buttons">Details</button>

</article>
`);

    return `
          <div class="container__reports">
              <section class="reports-container">
                    ${getDomStringFromArray(printData)}
              </section>
        
            <button class="button container__reports__button ">Load more</button>
            
        </div>

        `;
};


const addEventsListeners = () => {};

export default Reports;
export { addEventsListeners };
