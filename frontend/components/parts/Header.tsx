import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/parts/header.scss';
import { handleLogout } from '../../actions';
import { getJwt } from '../../helpers';
import Logo from '../utils/svg/Logo';
import axios from "axios";
import {toggleMobileMenu} from "./utils";

interface HeaderProps {
    user: {
        name: string|undefined
    },
    isUserLoggedIn: boolean|null,
    dispatchLogout: Function,
    host: string,
    setUser: Function
}

const Header: React.FC <HeaderProps>= ({user, isUserLoggedIn, dispatchLogout, host, setUser}) => {
    useEffect(() => {
        const jwt = getJwt();

        if (!jwt) {
            this.props.setUser(undefined);
            return;
        }

        if (isUserLoggedIn === null) {
            axios.get(`${host}/api/user`, {headers: {Authorization: jwt}}).then(res => {
                setUser(res.data.user);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, []);
    return (
        <header className="c-header">
            <div className="c-header__wrapper">
                <Link className="c-header__logo c-logo" to="/">
                   <Logo/>
                </Link>
                <div className="c-header__menu-wrapper">
                    <button className="c-header__hamburger c-header__hamburger--closed" onClick={toggleMobileMenu}>
                        <span className="c-header__hamburger-line"></span>
                        <span className="c-header__hamburger-line"></span>
                        <span className="c-header__hamburger-line"></span>
                    </button>
                    <div className="c-header__menu c-header__menu--mobile-hidden">
                    {isUserLoggedIn
                    ?
                        <React.Fragment>
                            <p className="c-header__login-information">Witaj, {user.name}</p>
                            <button className="c-header__button c-header__button--logout" onClick={() => dispatchLogout()}>
                                <Link className="c-header__link" to="/">
                                    wyloguj się
                                </Link>
                            </button>
                            <button className="c-header__button c-header__button--user-panel">
                                <Link className="c-header__link" to="/user-panel">
                                    panel użytkownika
                                </Link>
                            </button>
                        </React.Fragment>

                    :  <React.Fragment>
                            <button className="c-header__button">
                                <Link className="c-header__link" to="/login">
                                    zaloguj się
                                </Link>
                            </button>
                            <button className="c-header__button">
                                <Link className="c-header__link" to="/register">
                                    zarejestruj się
                                </Link>
                            </button>
                        </React.Fragment>
                    }
                    </div>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn,
    host: state.host
})

const mapDispatchToProps = dispatch => {
    return {
        dispatchLogout: () => dispatch(handleLogout()),
        setUser: (user) => dispatch({ type: 'SET_USER', payload: {user} })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
