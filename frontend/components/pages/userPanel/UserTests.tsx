import '../../../css/pages/userTests.scss';
import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import Header from "../../parts/Header";
import {requestDeleteQuiz, requestUserQuizes} from "../../../actions";
import { Loader } from "../../utils/Loader";
import getTestHubListContent from "../TestsHub/utils/getTestHubListContent";
import shouldListContentRender from "../TestsHub/utils/shouldListContentRender";

const UserTests = ({user, isUserLoggedIn, userTests, onRequestUserQuizes, onHandleRemoveQuiz}) => {
    useEffect(() => {
        if(isUserLoggedIn) {
            onRequestUserQuizes(user.id);
        }
    }, [])

    const renderListContent = getTestHubListContent(userTests, true, onHandleRemoveQuiz);
    const shouldRender = shouldListContentRender(renderListContent);

    console.log(shouldRender)
    console.log(renderListContent);
    return (
        <React.Fragment>
            <Header/>
            <main className="c-user-tests">
                <div className="o-container">
                    <h1 className="c-user-tests__title">Testy użytkownika {user.name}:</h1>
                    {(shouldRender && renderListContent) || <Loader/>}
                </div>

            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn,
    userTests: state.userTests
})

const mapDispatchToProps = dispatch => {
    return {
        onRequestUserQuizes: (userId) => {
            dispatch(requestUserQuizes(userId));
        },
        onHandleRemoveQuiz: (testId) => {
            dispatch(requestDeleteQuiz(testId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTests);
