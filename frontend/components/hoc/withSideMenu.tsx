import React from "react";
import Header from "../parts/Header";
import { Link } from 'react-router-dom';

export const WithSideMenu = Component => props => {
    return (
        <React.Fragment>
            <Header/>
            <main className="c-page">
                <div className="o-container">
                    <div className="c-test-hub__title-container">
                        <h1 className="o-title o-title--h2 o-title--line c-test-hub__title">
                            Dostępne testy
                        </h1>
                    </div>
                    <aside className="c-test-hub__menu">
                        <Link to="/" className="c-test-hub__menu-item">Strona główna</Link>
                        <Link to="/create-quiz" className="c-test-hub__menu-item">Utwórz quiz</Link>
                    </aside>
                    <Component />
                </div>
            </main>
        </React.Fragment>
    );
}
