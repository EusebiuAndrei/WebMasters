
import Map from './Map.js';
import Navbar from './Navbar.js';
import Banner from './Banner.js';
import Statistics from './Statics.js';
import BarGraph from './BarGraph.js';
import Pie from './Pie.js';
import Reports from './Reports.js';
import Subscribe from './Subscribe.js';
import Footer from './Footer.js';

const App = () => {
    return `
        <div class="container">
            ${Banner()}
            ${Navbar()}
            ${Map()}
            ${Statistics()}
            ${BarGraph()}
            ${Pie()}
            ${Reports()}
            ${Subscribe()}
            ${Footer()}
            
        </div>
            `;
};

export default App;
