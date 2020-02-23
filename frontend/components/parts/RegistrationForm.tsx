import React from "react";
import '../../css/parts/registrationForm.scss';
import { connect } from 'react-redux';
import InputLine from '../parts/InputLine';

const RegistrationForm: React.SFC  = () => {
    return (
       <form className="o-registration-form">
           <p className="o-registration-form__title o-title o-title--h2 o-title--line">
               Rejestracja
            </p>
            <p className="o-registration-form__desc">
                Rejestrując się otrzymasz szereg udogodnień, takich jak dostęp do statystyk, możliwość zapisywania i tworzenia testów, jak i oceniania testów innych użytkowników.
            </p>
            <InputLine name="login" type="text" icon="user" placeholder="login"/>
            <InputLine name="email" type="email" icon="email" placeholder="email"/>
            <InputLine name="password" type="password" icon="password" placeholder="hasło"/>
            <InputLine name="password2" type="password" icon="password" placeholder="powtórz hasło"/>
            <InputLine name="submit" type="submit" value="Zarejestruj się" classes="o-input--submit"/>
       </form>
    );
}


export default connect(null, null)(RegistrationForm)