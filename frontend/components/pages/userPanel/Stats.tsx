import '../../../css/pages/userStats.scss';
import React, {useEffect} from "react";
import { connect } from 'react-redux';
import Header from "../../parts/Header";
import Loader from "../../utils/Loader";
import getTestHubListContent from "../TestsHub/utils/getTestHubListContent";
import shouldListContentRender from "../TestsHub/utils/shouldListContentRender";
import {requestUserFinishedQuizes} from "../../../actions";

const Stats = ({user, isUserLoggedIn, userFinishedTests, onRequestQuizesFinishedByUser}) => {
    useEffect(() => {
        if(isUserLoggedIn) {
            onRequestQuizesFinishedByUser(user.id);
        }
    }, [])

    const renderListContent = getTestHubListContent(userFinishedTests, true);
    const shouldRender = shouldListContentRender(renderListContent);

    return (
        <React.Fragment>
            <Header/>
            <main className="o-main-content c-user-stats">
                <div className="o-container">
                    <h1 className="c-user-stats__title">Statystyki</h1>
                    <section className="c-user-stats__section">
                        <h2 className="c-user-stats__section-title">Ukończone testy</h2>
                        {(shouldRender && renderListContent) || <Loader/>}
                    </section>
                </div>
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    isUserLoggedIn: state.isUserLoggedIn,
    userFinishedTests: state.userFinishedTests
})

const mapDispatchToProps = dispatch => {
    return {
        onRequestQuizesFinishedByUser: (userId) => {
            dispatch(requestUserFinishedQuizes(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

