import '../../css/parts/cookies.scss';
import React from "react";
import {Button} from "../utils/Button";
import {Link} from 'react-router-dom';
import Cookie from "../utils/svg/Cookie";

const Cookies = () => {
    return (
        <div className="c-cookies">
            <div className="c-cookies__background"></div>
            <div className="c-cookies__inner">
                <div className="c-cookies__picture">
                    <Cookie/>
                </div>
                <div className="c-cookies__content">
                    <b className="c-cookies__title">Pliki cookies</b>
                    <p className="c-cookies__text">
                        Serwis funkcjonuje w oparciu o ciasteczka. Czy zgadzasz się na wykorzystywanie ciasteczek? Naszą politykę cookies możesz przejrzeć tutaj:
                        <Link to='/' className="c-cookies__link">polityka cookies</Link>
                    </p>
                    <Button buttonText={`zgadzam się`} classList={`o-button--primary c-cookies__ok`} handleClick={() => {alert('handleCookieConsent')}}/>
                    <Button buttonText={`zapytaj później`} classList={`c-cookies__ask-later`} handleClick={() => {alert('handleCookieConsent')}}/>
                </div>
            </div>
        </div>
    )
}

export default Cookies;
