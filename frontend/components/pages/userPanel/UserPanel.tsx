import '../../../css/pages/userPanel.scss';
import classroom from '../../../img/classroom.jpg';
import React from "react";
import { connect } from 'react-redux';
import Header from "../../parts/Header";
import { Link } from 'react-router-dom';
import {handleLogout} from "../../../actions";

const UserPanel = (props) => {
    return (
        <React.Fragment>
            <Header/>
            <section className="c-user-panel">
                <div className="o-container">
                    <h1 className="c-user-panel__title">Witaj, {props.user.name}</h1>
                    <main className="c-user-panel__tiles">
                        <Link to="/user-tests" className="c-user-panel__tile">
                            <p className="c-user-panel__tile-text">Zarządzaj testami</p>
                        </Link>
                        <div className="c-user-panel__tile c-user-panel__tile--image">
                           <img className="c-user-panel__image" src={classroom} alt="Empty classroom"/>
                        </div>
                        <Link className="c-user-panel__tile" to="/" onClick={() => props.dispatchLogout()}>
                            <p className="c-user-panel__tile-text">
                                Wyloguj się
                            </p>
                        </Link>
                        <button className="c-user-panel__tile c-user-panel__tile--dark">
                            <p className="c-user-panel__tile-text">Usuń konto</p>
                        </button>
                        <button className="c-user-panel__tile">
                            <p className="c-user-panel__tile-text">Statystyki</p>
                        </button>
                    </main>
                </div>
            </section>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        dispatchLogout: () => dispatch(handleLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
