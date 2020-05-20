import React from "react";
import Header from "../../../parts/Header";
import AuthOverlord from "../../../auth/AuthOverlord";
import { Link } from 'react-router-dom';

const Results = () => {
    return (
        <React.Fragment>
            <Header/>
            <main className="c-test-results">
                <div className="o-container">
                    <br/><br/><br/><br/><br/><br/><br/>
                    <h1 className="c-test-results__title">Wyniki</h1><br/>
                    <p>Gratulacje, pomyślnie ukończyłeś quiz!</p>
                    <Link to="/">Wróć do strony głównej</Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Results;
