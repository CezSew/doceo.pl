import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import '../../css/pages/home.scss';
import Header from '../parts/Header';
import AuthOverlord from '../auth/AuthOverlord';
import RegistrationForm from '../parts/RegistrationForm';

const Home = () => (
    <React.Fragment>
            <Header/>
            <main className="c-home c-content">
                <div className="o-container">
                    <section className="c-home__introduction c-introduction">
                        <div className="c-introduction__description-box">
                            <h1 className="c-introduction__title">
                                Ucz się <span className="o-underlined">wydajniej</span>
                            </h1>
                            <p className="c-introduction__description">
                                Wiedza to potęga. Pozwolimy Ci ją ujarzmić dzięki zestawowi darmowych narzędzi. Ucz się, udostępniaj, oceniaj, popularyzuj!
                            </p>
                            <div className="c-introduction__buttons">
                                <Link className="o-button o-button--primary" to="/">
                                    Dowiedz się więcej
                                </Link>
                                <Link className="o-link o-link--secondary" to="/tests-main">
                                    Szukaj testów
                                </Link>
                            </div>
                        </div>
                        <div className="c-introduction__registration-box">
                            <RegistrationForm />
                        </div>
                    </section>
                </div>
            </main>
    </React.Fragment>
);

export default React.memo(Home)
