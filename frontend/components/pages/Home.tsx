import React from "react";
import {Link} from 'react-router-dom';
import '../../css/pages/home.scss';
import Header from '../parts/Header';
import { connect } from 'react-redux';
import AuthOverlord from '../auth/AuthOverlord';
import RegistrationForm from '../parts/RegistrationForm';

interface HomeProps {
    user: {
        name: string|undefined
    }
}

const Home: React.SFC <HomeProps> = ({user}) => {
    return (
        <AuthOverlord>
            <Header/>
            <main className="c-home">
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
                                <Link className="o-button o-button--gradient" to="/">
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
        </AuthOverlord>
    );
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Home)