import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import Header from "../../parts/Header";
import { getUserTests } from "./utils";

const UserTests = ({user,isUserLoggedIn,host}) => {
    useEffect(() => {
        if(isUserLoggedIn) {
            getUserTests(user.id, host);
        } else {
            alert('zaloguj się!')
        }
    }, [])

    return (
        <React.Fragment>
            <Header/>
            <main className="c-user-tests">
                testy użytkownika {user.name}
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn,
    host: state.host
})

export default connect(mapStateToProps, null)(UserTests);
