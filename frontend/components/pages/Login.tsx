import React, { useContext, useEffect } from "react";
import '../../css/pages/login.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../parts/Header';
import InputLine from '../parts/InputLine';
import books from '../../img/books.jpg';

interface LoginProps {
    history: any
}
interface LoginState {
    username: string,
    password: string,
    error: boolean
}

export default class Login extends React.Component<LoginProps, LoginState> {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: this.state.username,
            password: this.state.password
        }).then(res => {
          localStorage.setItem('jwt', res.data.token);
          this.props.history.push('/')
        }).catch(() => {
            this.setState({
                error: true
            });
        });
    }

    onChange(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const result = {};
        result[fieldName] = fieldValue;
        this.setState({...result});
    }

    render() {
        let errorElem = <React.Fragment></React.Fragment>;
        
        if(this.state.error) {
            errorElem = <p className="o-error-container__text">Login or password is incorrect.</p>
        }

        return (
            <React.Fragment>
                <Header/>
                <main className="c-login">
                    <img className="c-login__background" src={books} alt="books"/>
                    <div className="o-container">
                        <form className="o-form o-form--login">
                            <h1 className="o-form__title o-title o-title--h2 o-title--line">Logowanie</h1>
                            <InputLine name="username" type="text" icon="user" placeholder="login" handleOnChange={this.onChange}/>
                            <InputLine name="password" type="password" icon="user" placeholder="hasło" handleOnChange={this.onChange}/>
                            <div className="o-error-container">
                                {errorElem}
                            </div>
                            <InputLine name="Login" type="submit" value="Zaloguj się" classes="o-input--submit" handleClick={this.handleLogin}/>
                        </form>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}