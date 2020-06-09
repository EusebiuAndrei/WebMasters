import * as Navbar from '../components/Navbar.js';
import * as Banner from '../components/Banner.js';
import * as Footer from '../components/Footer.js';

const Documentation = () => {
	return `
    ${Banner.default()}
            ${Navbar.default()}
    <article typeof="schema:ScholarlyArticle">
    <header>
      <h1 property="schema:name">AVi - Documentația proiectului</h1>
    </header>
    <div role="contentinfo">
      <section typeof="sa:AuthorsList">
        <h2>Authors</h2>
        <ul>
          <li typeof="sa:ContributorRole" property="schema:author">
            <span typeof="schema:Person">
              <meta property="schema:givenName" content="Tudor">
              <meta property="schema:familyName" content="Iacobescu">
              <span property="schema:name">Iacobescu Tudor</span>
            </span>
            <ul>
              <li property="schema:roleContactPoint" typeof="schema:ContactPoint">
                <a href="mailto:tudor.iacobescu.1@gmail.com" property="schema:email">
                  tudor.iacobescu.1@gmail.com
                </a>
              </li>
            </ul>
          </li>
          <li typeof="sa:ContributorRole" property="schema:author">
            <span typeof="schema:Person">
              <meta property="schema:givenName" content="Eusebiu">
              <meta property="schema:additionalName" content="Andrei">
              <meta property="schema:familyName" content="Gagea">
              <span property="schema:name">Eusebiu A. Gagea</span>
            </span>
            <ul>
              <li property="schema:roleContactPoint" typeof="schema:ContactPoint">
                <a href="mailto:eusebiuandrei_gagea@yahoo.co.uk" property="schema:email">
                  eusebiuandrei_gagea@yahoo.co.uk
                </a>
              </li>
            </ul>
          </li>
          <li typeof="sa:ContributorRole" property="schema:author">
            <span typeof="schema:Person">
              <meta property="schema:givenName" content="Daniel">
              <meta property="schema:familyName" content="Bîcu">
              <span property="schema:name">Bîcu Daniel</span>
            </span>
            <ul>
              <li property="schema:roleContactPoint" typeof="schema:ContactPoint">
                <a href="mailto:daniel.bicu008@yahoo.com" property="schema:email">
                  daniel.bicu008@yahoo.com
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
    <section>
      <h2>Specificația cerințelor</h2>
      <section>
        <h3>Cerința originală</h3>
        <blockquote>
          Sa se dezvolte un instrument Web de vizualizare flexibila a datelor vizand accidentele din SUA, pe baza unui API
          REST/GraphQL propriu. Statisticile si vizualizarile generate – minim 3 maniere + redari cartografice pe baza
          unor servicii Web de profil – vor putea fi exportate in formatele CSV, PNG si SVG. Sistemul va oferi suport si
          pentru cautarea multi-criteriala de incidente raportate.
        </blockquote>
      </section>
      <section>
        <h3>Alinierea cerințelor cu implementarea</h3>
        <p>
          Pagina permite vizualizarea customizabilă a datelor în trei reprezentări (bar graph, line graph & pie chart) + o
          redare cartografică pe teritoriul fiecărui stat. Reprezentările pot fi exportate ca și CSV, PNG, SVG și PDF.
        </p>
        <p>
          Pentru căutarea multi-criterială de incidente raportate, sunt disponibile niște rute publice ale API-ului REST
          care pot fi apelate pentru a obține un set de accidente filtrate și ordonate după diverse criterii.
        </p>
      </section>
    </section>
    <section>
      <h2>Dezvoltarea proiectului</h2>
      <section>
        <h3>Împărțirea cerințelor</h3>
        <p>
          În general, ne-am împărțit pe diverse bucăți ale proiectului în orice moment, dar am lucrat flexibil, de
          multe ori intrând unul peste codul mai vechi al celuilalt pentru a face o îmbunătățire, a rezolva o problemă,
          etc. Așadar, este greu de spus "cine a făcut ce" cu exactitate.
        </p>
        <p>
          În linii mari, totuși, scheletul aplicației a fost alcătuit de Eusebiu și eventual împărțit de Tudor; pentru
          componentele grafice, am lucrat fiecare la câteva componente, cu toate că odată cu evoluția proiectului multe
          dintre ele au fost înlocuite sau scoase din aplicație. API-ul pentru datele din reprezentări a fost făcut de
          Tudor, iar cel pentru accesarea accidentelor individuale de către Daniel.
        </p>
      </section>
      <section>
        <h3>Tehnologii utilizate</h3>
        <p>
          Aplicația a fost dezvoltată folosind node.js. Principalele librării folosite sunt chart.js (pentru grafice), moment.js (ca și dependință a chart.js necesară prelucrării datelor temporale), și leaflet.js (pentru hartă).
          Back-end-ul este conectat la o bază de date MongoDB. Pentru front-end, am folosit fișiere SCSS compilate în
          cod CSS prin Sass, iar HTML-ul este construit dinamic cu ajutorul JavaScript.
        </p>
      </section>
      <section>
        <h3>Evoluția aplicației</h3>
        <p>Inițial, am lucrat la componenta "I", cu o idee ce includea inițial doar pagina principală, cu mai multe
          componente care au fost ulterior reduse la ceea ce este prezent acum. 
        </p>
        <p>
          Pe parcurs, prin discuțiile cu profesorul coordonator, Dr. Andrei Panu, am realizat că ideea noastră nu acoperea
          exact cerințele și așteptările acestuia. Structura site-ului a fost modificată, adăugându-se o pagină dedicată
          generării reprezentărilor.
        </p>
        <p>
          Datele la care aplicația permite accesul, obținute din 
          <a href=https://www.kaggle.com/sobhanmoosavi/us-accidents>sursa menționată în cerințele proiectului</a>, 
          erau inițial sub forma unui fișier .csv, în jur de 1GB în mărime. Acest fișier a fost modificat pentru a permite
          importarea datelor într-o bază de date MongoDB. 
        </p>
        <p>
          Prin eforturile lui Eusebiu, partea de front a aplicației este structurată într-un mod inspirat de către React,
          și servită de către un router fără folosirea vre-unui framework. Asemănător, pe back-end, structura este
          inspirată de către framework-ul Express.js, fiind alcătuite diverse sisteme ce permit o sintaxă asemănătoare
          cu a acestuia.
        </p>
        <p>
          Undeva în acest punct al dezvoltării, la sfatul domnului profesor, structura monolitică a aplicației a fost
          împărțită în trei aplicații separate - API-ul de accesare a accidentelor, API-ul de management al userilor de
          administrare, și aplicația web propriu-zisă.
        </p>
        <p>
          Odată ce au fost puse în funcțiune API-urile necesare funcționării aplicației web, a fost implementată apelarea
          acestora cu date obținute din formularul de customizare a reprezentărilor, datele obținute fiind folosite cu
          librăriile chart.js și leaflet.js pentru a genera reprezetări grafice.
        </p>
        <p>
          Ultima săptămână din proiect a fost dedicată mai mult asigurării unui anumit nivel de "polish" - stilul vizual
          a fost făcut puțin mai consistent, ultimele funcționalități au fost puse la punct, și codul a fost puțin
          curățat. Tot odată, au fost scrise documentația pentru API, respectiv cele două documente Scholarly HTML.
        </p>
      </section>
    </section>
  </article>
  ${Footer.default()}
    `;
};

const initialize = () => {};

export default Documentation;
export { initialize };
