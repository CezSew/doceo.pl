import '../../css/parts/cookies.scss';
import React, {useState} from "react";
import {Button} from "../utils/Button";
import CookieSVG from "../utils/svg/Cookie";
import {getCookie, setCookie} from '../../helpers/cookieUtils';

const Cookies = () => {
    const [consent, setConsent] = useState(false)

    if(getCookie('cookie_consent') && !consent) {
        setConsent(true);
    }
    const setCookieConsent = (isTemporary) => {
        const days = isTemporary ? 1 : 365;
        setCookie('cookie_consent', '1', days);
        setConsent(true);
    }

    return (
        <div className={`c-cookies ${!consent ? 'active' : ''}`}>
            {!consent
            && (
                <React.Fragment>
                    <div className="c-cookies__background"></div>
                    <div className="c-cookies__inner">
                        <div className="c-cookies__picture">
                            <CookieSVG/>
                        </div>
                        <div className="c-cookies__content">
                            <b className="c-cookies__title">Pliki cookies</b>
                            <p className="c-cookies__text">
                                Serwis funkcjonuje w oparciu o ciasteczka aby zapewnić najlepsze doświadczenia użytkownikowi. Czy zgadzasz się na wykorzystywanie ciasteczek przez serwis?
                            </p>
                            <Button buttonText={`zgadzam się`} classList={`o-button--primary c-cookies__ok`} handleClick={setCookieConsent}/>
                            <Button buttonText={`zapytaj później`} classList={`c-cookies__ask-later`} handleClick={() => setCookieConsent(true)}/>
                        </div>
                    </div>
                </React.Fragment>
            )}

        </div>
    )
}

export default Cookies;
