import './../../../../css/pages/testHub.scss';
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { requestTopQuizes } from '../../../../actions';
import { Loader } from '../../../utils/Loader';
import { TestsHubProps } from "./types";
import Header from '../../../parts/Header';
import getTestHubListContent from '../utils/getTestHubListContent';
import shouldListContentRender from '../utils/shouldListContentRender';
import Sidemenu from "../../../parts/Sidemenu";
import Cookies from "../../../parts/Cookies";

const TestsHub = (props: TestsHubProps) => {
    useEffect(() => {
        props.onRequestTopQuizes();
    }, [])

    const {quizes_all_by_rating} = props;
    const renderListContent = getTestHubListContent(quizes_all_by_rating);
    const shouldRender = shouldListContentRender(renderListContent);
    const links = [['/', "Dostępne testy", true], ['/', "Strona główna"], ["/create-quiz", "Utwórz quiz"]];

    return (
        <React.Fragment>
            <Header/>
            <main className="c-test-hub o-main-content o-main-content--two-col">
                <Sidemenu links={links} />
                <div className="o-main-content__wrapper">
                    <div className="c-test-hub__title-container">
                        <h1 className="o-title o-title--h2 c-test-hub__title">
                            Dostępne testy
                        </h1>
                    </div>
                    <section className="c-test-hub__main">
                        <div className="c-test-hub__table">
                            <div className="c-test-hub__table-header">
                                <div className="c-test-hub__table-th c-test-hub__table-th--name">
                                    Nazwa quizu
                                </div>
                                <div className="c-test-hub__table-th c-test-hub__table-th--type">
                                    Typ
                                </div>
                                <div className="c-test-hub__table-th c-test-hub__table-th--score">
                                    Twój wynik
                                </div>
                                <div className="c-test-hub__table-th c-test-hub__table-th--rating">
                                    Ocena
                                </div>
                            </div>
                            <ul className="c-test-hub__quiz-list">
                                {(shouldRender && renderListContent) || <Loader/>}
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
            <Cookies/>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    user: state.user,
    quizes_all_by_rating: state.quizes_all_by_rating,
    request_in_progress: state.request_in_progress
});

const mapDispatchToProps = dispatch => {
    return {
      onRequestTopQuizes: () => {
        dispatch(requestTopQuizes());
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestsHub)
