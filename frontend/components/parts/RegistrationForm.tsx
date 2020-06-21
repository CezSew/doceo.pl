import React, { useState } from "react";
import '../../css/parts/registrationForm.scss';
import InputLine from '../parts/InputLine';
import { handleSubmitRegisterForm } from "./utils";
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import { connect } from 'react-redux';

const RegistrationForm = (props) => {
    const [loading, setLoading] = useState(false);
    const { history, host, isUserLoggedIn } = props;

    return (
       <form className={`o-form js-register-form ${loading && 'o-form--loading'}`} onSubmit={(e) => handleSubmitRegisterForm(e, history, setLoading, host)}>
           <p className="o-form__title o-title o-title--h2 o-title--line">
               Rejestracja
            </p>
            <p className="o-form__desc">
                Rejestrując się otrzymasz szereg udogodnień, takich jak dostęp do statystyk, możliwość zapisywania i tworzenia testów, jak i oceniania testów innych użytkowników.
            </p>
            <InputLine name="login" type="text" icon="user" placeholder="login" classes={'js-register-login'} required={true}/>
            <InputLine name="email" type="email" icon="email" placeholder="email" classes={'js-register-email'} required={true}/>
            <InputLine name="password" type="password" icon="password" placeholder="hasło" classes={'js-register-password'} required={true}/>
            <InputLine name="password2" type="password" icon="password" placeholder="powtórz hasło" classes={'js-register-password2'} required={true}/>
            <InputLine name="submit" type="submit" value="Zarejestruj się" classes="o-input--submit"/>
       </form>
    );
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn,
    host: state.host
})

export default
compose<any>(
    withRouter,
    connect(mapStateToProps, null)
)(RegistrationForm)
