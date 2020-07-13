import '../../../css/pages/register.scss';
import React from "react";
import Header from "../../parts/Header";
import RegistrationForm from "../../parts/RegistrationForm";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const Register = ({isUserLoggedIn}) => {
    const content = isUserLoggedIn
    ? <Redirect to='/' />
    : (
            <React.Fragment>
                <Header/>
                <main className="c-register o-main-content">
                    <div className="o-container">
                        <div className="c-register__form-container">
                            <RegistrationForm/>
                        </div>
                    </div>
                </main>
            </React.Fragment>
    )

    return content;
}

const mapStateToProps = state => ({
    isUserLoggedIn: state.isUserLoggedIn
})

export default connect(mapStateToProps, null)(Register);
