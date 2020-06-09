const Help = () => {
	return `
    <article typeof="schema:ScholarlyArticle" class="doc-root">
    <header>
      <h1 property="schema:name">Ghid de utilizare</h1>
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
      <h2>Pagina principală</h2>
      <p>
        Pe pagina principală, sunt vizibile câteva reprezentări bazate pe setările implicite ale fiecăreia dintre 
        acestea. Acestea pot fi înlocuite ulterior de ultimele reprezentări salvate în memoria browserului. Pe lângă 
        reprezentări, în partea de jos sunt disponibile mai multe informații despre autorii proiectului.
      </p>
      <p>
        În ceea ce privește interacțiunea cu situl, un utilizator poate folosi link-urile din bara de navigație sau pe 
        cele din subsolul paginii pentru a accesa diverse resurse, sau butonul "Tool" din bara de navigație pentru a 
        accesa pagina de creare a reprezentărilor.
      </p>
    </section>
    <section>
      <h2>Pagina "Tool"</h2>
      <p>
        În această pagină, utilizatorul poate să își creeze propriile reprezentări. Inițial, reprezentările vizibile 
        sunt cele implicite, dar acestea pot fi schimbate. Se poate schimba între diferitele reprezentări folosind
        meniul drop-down din partea stângă a barei de navigație.
      </p>
      <section>
        <h3>Schimbarea opțiunilor</h3>
        <p>
          Pentru a schimba reprezentările, se va folosi butonul de "Options". Acesta va deschide un meniu drop-down care
          permite schimbarea unor opțiuni și a seturilor de date pe care sunt bazate reprezentările. În partea dreaptă se
          pot selecta opțiuni specifice, iar în partea stângă, apăsând pe butonul cu "+", se poate adăuga un nou set de
          date la reprezentare. Acesta poate avea un nume, și unul sau mai multe filtre care să permită obținerea unor
          date mai specifice.
        </p>
      </section>
      <section>
        <h3>Exportare</h3>
        <p>
          Odată ce utilizatorul este mulțumit de reprezentare, aceasta poate fi exportată. Meniul de exportare poate fi
          accesat prin butonul "Export". De aici, se poate alege un format de exportare (pdf, svg, png sau csv) și
          downloada reprezentarea.
        </p>
      </section>
    </section>
    <section>
      <h2>API-ul public</h2>
      <p>Unele rute ale API-ului folosit de pagină pot fi folosite și de un utilizator. Mai multe informații găsiți în
        subsolul paginii principale, la link-ul "Public API documentation".
      </p>
    </section>
  </article>
    `;
};

const initialize = () => {};

export default Help;
export { initialize };
