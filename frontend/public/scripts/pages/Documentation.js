const Documentation = () => {
	return `
    <article typeof="schema:ScholarlyArticle" class="doc-root">
    <header>
      <h1 property="schema:name">Documentația proiectului</h1>
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
          Pagina permite vizualizarea personalizabilă a datelor în trei reprezentări (bar graph, line graph & pie chart) + o
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
          În multe cazuri, ne-am împărțit în multe task-uri mici în loc de câteva mai mari, lucrând împreună la multe
          componente. Dacă ar fi să luăm în considerare cine este cel mai responsabil de părțile principale ale
          aplicației, o posibilă împărțire ar fi următoarea:
        </p>
        <ul>
        	<li>
        		<p>
        		<b>Eusebiu</b> a făcut structura de bază a aplicației, punând la punct sisteme ca routerul și modul în 
        		care paginile sunt construite dinamic. Mai mult, cu toate că componentele de interfață au fost 
        		împărțite, el le-a pus pe toate cap la cap, iar funcționarea părții de front a personalizării 
        		reprezentărilor a fost în mare munca sa.
        		</p>
			</li>
			<li>
        		<p>
        		<b>Tudor</b> a lucrat la back-end-ul accidentelor, la structura modelului și a bazei de date,
        		respectiv controllerele, schemele și serviciile aferente rutei \/accidents\/chart\_data. În rest,
        		contribuția sa a fost în mare pe design și code quality.
        		</p>
			</li>
			<li>
        		<p>
        		<b>Daniel</b> a lucrat la back-end-ul de useri, respectiv a continuat back-end-ul accidentelor cu rutele
        		de CRUD. În afară de asta, el a lucrat și la reprezentări și exportarea lor.
        		</p>
			</li>
		</ul>
      </section>
      <section>
        <h3>Tehnologii utilizate</h3>
        <p>
          Aplicația a fost dezvoltată folosind node.js. Principalele biblioteci folosite sunt chart.js (pentru grafice), 
          moment.js (ca și dependință a chart.js necesară prelucrării datelor temporale), și leaflet.js (pentru hartă).
          Back-end-ul este conectat la o bază de date MongoDB. Pentru front-end, am folosit fișiere SCSS compilate în
          cod CSS prin Sass, iar HTML-ul este construit dinamic cu ajutorul JavaScript.
        </p>
        <p>
        Node.js a fost ales deoarece folosește JavaScript, care este folosit și la front-end, și este o soluție modernă
        și foarte populară în ceea ce privește dezvoltarea API-urilor REST. Bibliotecile pentru reprezentări au fost
        alese în funcție de licență, neputând folosi librării cu plată. MongoDB a fost ales ca și bază de date din cauza
        simplității structurii necesare proiectului, și a ușurinței folosirii sale prin Mongoose.
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
    <section>
    	<h2>Structura proiectului</h2>
    	<p>Proiectul este structurat în trei microservicii: o aplicație web și două API-uri.</p>
		<figure typeof="sa:image">
    	<img src="../images/General.png" alt="A chart of the structure of the entire application">
    	<figcaption>The structure of the entire application</figcaption>
    	</figure>
    	
    	<section>
    		<h3>Aplicație web</h3>
    		<p>
    		Aplicația web servește clientului resursele necesare pentru a randa site-ul. Aceasta este structurată
    		precum urmează:
    		</p>
    		<figure typeof="sa:image">
    		<img src="../images/Front2.png" alt="A chart of the structure of the front-end application">
    		<figcaption>The structure of the client application</figcaption>
    		</figure>
    		<p>
    		Clientul cere resursele de la Router, care i le servește. Printre resurse sunt și o colecție de scripturi,
    		care construiesc pagina într-un mod asemănător React (toate paginile sunt generate dinamic prin JavaScript), 
    		și un State Manager, care face apelurile la API și stochează date în Session Storage.
			</p>
		</section>
		<section>
			<h3>API-uri</h3>
			<p>
			Aplicația folosește două API-uri: unul furnizează accidentele (și o parte din acesta este accesibil public),
			celălalt verifică autorizația în cazul apelurilor la precedentul care le necesită și permite înregistrarea
			administratorilor. 
			</p>
			<figure typeof="sa:image">
			<img src="../images/Back.png" alt="A chart of the structure of the APIs">
			<figcaption>The structure of the APIs</figcaption>
			</figure>
			<p>
			Cererea de la client ajunge la Router, care o trimite la Controllerul potrivit. Acesta apelează un serviciu,
			care validează cererea, verifică autorizația (dacă este nevoie), și apelează prin model baza de date. După
			ce un răspuns a fost creat, acesta este trimis de Controller înapoi la client.
			</p>
		</section>
	</section>
  </article>
    `;
};

const initialize = () => {
};

export default Documentation;
export { initialize };
