import React, { useState } from "react";
import '../../../css/pages/login.scss';
import Header from '../../parts/Header';
import InputLine from '../../parts/InputLine';
import { requestLogin } from "../../../actions";
import { connect } from 'react-redux';
import { LoginProps } from "./types";

const Login = (props: LoginProps) => {
    const [state, setState] = useState({
        username: '',
        password: '',
        error: false
    })

    const onChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const result = {};
        result[fieldName] = fieldValue;
        setState({...state, ...result});
    }

    let errorElem = <React.Fragment></React.Fragment>;

    if(state.error) {
        errorElem = <p className="o-error-container__text">Login or password is incorrect.</p>
    }

    return (
        <React.Fragment>
            <Header/>
            <main className="c-login">
                <div className="o-container">
                    <form
                    className="o-form o-form--login"
                    onSubmit={(e) => props.dispatchLogin(e, state.username, state.password, props.history)}>
                        <h1 className="o-form__title o-title o-title--h2 o-title--line">Logowanie</h1>
                        <InputLine name="username" type="text" icon="user" placeholder="login" handleOnChange={onChange}/>
                        <InputLine name="password" type="password" icon="user" placeholder="hasło" handleOnChange={onChange}/>
                        <div className="o-error-container">
                            {errorElem}
                        </div>
                        <InputLine name="Login" type="submit" value="Zaloguj się" classes="o-input--submit"/>
                    </form>
                </div>
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn
})

const mapDispatchToProps = dispatch => {
    return {
        dispatchLogin: (e, email, password, history) => dispatch(requestLogin(e, email, password, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

