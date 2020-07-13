import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/parts/header.scss';
import { handleLogout } from '../../actions';
import { getJwt } from '../../helpers';
import Logo from '../utils/svg/Logo';
import axios from "axios";

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
            <div className="o-container o-container--space-between">
                <Link className="c-header__logo c-logo" to="/">
                   <Logo/>
                </Link>
                {isUserLoggedIn
                ?   <div className="c-header__login-section">
                        <p className="c-header__login-information">Witaj, {user.name}</p>
                        <button className="c-header__logout" onClick={() => dispatchLogout()}>
                            <Link className="c-header__link" to="/">
                                wyloguj się
                            </Link>
                        </button>
                        <button className="c-header__logout">
                            <Link className="c-header__link" to="/user-panel">
                                panel użytkownika
                            </Link>
                        </button>
                    </div>
                :   <Link className="c-header__link" to="/login">
                        zaloguj się
                    </Link>
                }
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
