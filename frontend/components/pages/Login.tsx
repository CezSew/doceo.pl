import React from "react";
import '../../css/pages/login.scss';
import Header from '../parts/Header';
import InputLine from '../parts/InputLine';
import { requestLogin } from "../../actions";
import { connect } from 'react-redux';

interface LoginProps {
    history: any,
    dispatchLogin: Function
}
interface LoginState {
    username: string,
    password: string,
    error: boolean
}

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }

        this.onChange = this.onChange.bind(this);
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
                    <div className="o-container">
                        <form
                        className="o-form o-form--login"
                        onSubmit={(e) => this.props.dispatchLogin(e, this.state.username, this.state.password, this.props.history)}>
                            <h1 className="o-form__title o-title o-title--h2 o-title--line">Logowanie</h1>
                            <InputLine name="username" type="text" icon="user" placeholder="login" handleOnChange={this.onChange}/>
                            <InputLine name="password" type="password" icon="user" placeholder="hasło" handleOnChange={this.onChange}/>
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

