import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../parts/Header';

const Protected = () => (
    <React.Fragment>
      <Header/>
      <div className="o-container">
        <section className="o-page-content">
            <h1 className="o-h1">
              Strona zastrzeżona dla zalogowanych użytkowników
            </h1>
            <p>Musisz się zalogować!</p>
            <h2><Link to="/">Wróć do strony głównej</Link></h2>
        </section>
      </div>
    </React.Fragment>
);

export default Protected;
