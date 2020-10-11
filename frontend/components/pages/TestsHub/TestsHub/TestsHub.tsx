import './../../../../css/pages/testHub.scss';
import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { requestTopQuizes } from '../../../../actions';
import { Loader } from '../../../utils/Loader';
import { TestsHubProps } from "./types";
import Header from '../../../parts/Header';
import getTestHubListContent from '../utils/getTestHubListContent';
import shouldListContentRender from '../utils/shouldListContentRender';
import Sidemenu from "../../../parts/Sidemenu";
import Cookies from "../../../parts/Cookies";
import Pagination from "./Pagination";

const TestsHub = (props: TestsHubProps) => {
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        if(props.user !== undefined ){
            props.onRequestTopQuizes();
        }
    }, [props.user])

    const {quizes_all_by_rating} = props;
    const renderListContent = getTestHubListContent(quizes_all_by_rating);
    const shouldRender = shouldListContentRender(renderListContent);
    const links = [['/', "Dostępne testy", true], ['/', "Strona główna"], ["/create-quiz", "Utwórz quiz"]];

    const getQuizes = (page) => {
        props.onRequestTopQuizes(page);
    }

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
                    <Pagination totalPages={props.quizes_listing_last_page} currPage={currPage} setCurrPage={setCurrPage} getQuizes={getQuizes}/>
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
                                {(!props.request_in_progress && shouldRender && renderListContent) || <Loader/>}
                            </ul>
                        </div>
                    </section>
                    <Pagination totalPages={props.quizes_listing_last_page} currPage={currPage} setCurrPage={setCurrPage} getQuizes={getQuizes}/>
                </div>
            </main>
            <Cookies/>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    user: state.user,
    quizes_all_by_rating: state.quizes_all_by_rating,
    request_in_progress: state.request_in_progress,
    quizes_listing_last_page: state.quizes_listing_last_page
});

const mapDispatchToProps = dispatch => {
    return {
      onRequestTopQuizes: (page) => {
        dispatch(requestTopQuizes(page));
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestsHub)
