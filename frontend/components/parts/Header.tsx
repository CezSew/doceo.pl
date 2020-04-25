import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/parts/header.scss';
import { handleLogout } from '../../actions';

interface HeaderProps {
    user: {
        name: string|undefined
    },
    isUserLoggedIn: boolean|null,
    dispatchLogout: Function
}

const Header: React.FC <HeaderProps>= ({user, isUserLoggedIn, dispatchLogout}) => {
    console.log(isUserLoggedIn)
    return (
        <header className="c-header">
            <div className="o-container o-container--space-between">
                <Link className="c-header__logo c-logo" to="/">
                   KOTUTOR <span  className="c-logo__text-bold">E-LEARNING</span>
                </Link>
                {isUserLoggedIn
                ?   <React.Fragment>
                        <p className="c-header__login-information">Logged in as {user.name}</p>
                        <button className="c-header__logout" onClick={() => dispatchLogout()}>
                            <Link className="c-header__link" to="/">
                                logout
                            </Link>
                        </button>
                    </React.Fragment>
                :   <Link className="c-header__link" to="/login">
                        login
                    </Link>
                }
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn
})

const mapDispatchToProps = dispatch => {
    return {
        dispatchLogout: () => dispatch(handleLogout()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
