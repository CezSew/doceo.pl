import '../../../css/pages/userPanel.scss';
import classroom from '../../../img/classroom.jpg';
import React from "react";
import { connect } from 'react-redux';
import Header from "../../parts/Header";

const UserPanel = (props) => {
    return (
        <React.Fragment>
            <Header/>
            <section className="c-user-panel">
                <div className="o-container">
                    <h1 className="c-user-panel__title">Witaj, {props.user.name}</h1>
                    <main className="c-user-panel__tiles">
                        <button className="c-user-panel__tile">
                            <p className="c-user-panel__tile-text">Zarządzaj testami</p>
                        </button>
                        <div className="c-user-panel__tile">
                           <img className="c-user-panel__image" src={classroom} alt="Empty classroom"/>
                        </div>
                        <button className="c-user-panel__tile">
                            <p className="c-user-panel__tile-text">Wyloguj się</p>
                        </button>
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

export default connect(mapStateToProps, null)(UserPanel)
