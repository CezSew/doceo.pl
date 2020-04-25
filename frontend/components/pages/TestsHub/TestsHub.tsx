import '../../../css/pages/home.scss';
import '../../../css/pages/testHub.scss';
import React from "react";
import {Link} from 'react-router-dom';
import Header from '../../parts/Header';
import { connect } from 'react-redux';
import AuthOverlord from '../../auth/AuthOverlord';
import { requestTopQuizes } from '../../../actions';
import { Loader } from '../../utils/Loader';
import getTestHubListContent from './utils/getTestHubListContent';
import shouldListContentRender from './utils/shouldListContentRender';

interface TestsHubProps {
    user: {
        name: string|undefined
    },
    quizes_all_by_rating: Array<string>|undefined,
    request_in_progress: boolean,
    onRequestTopQuizes: Function
}

class TestsHub extends React.Component <TestsHubProps> {

    componentDidMount() {
        this.props.onRequestTopQuizes();
    }

    render() {
        const {quizes_all_by_rating} = this.props;
        const renderListContent = getTestHubListContent(quizes_all_by_rating);
        const shouldRender = shouldListContentRender(renderListContent);

        return (
            <AuthOverlord>
                <Header/>
                <main className="c-test-hub">
                    <div className="o-container">
                        <div className="c-test-hub__title-container">
                            <h1 className="o-title o-title--h2 o-title--line c-test-hub__title">
                                Dostępne testy
                            </h1>
                        </div>
                        <aside className="c-test-hub__menu">
                        <Link to="/" className="c-test-hub__menu-item">Strona główna</Link>
                            <Link to="/create-quiz" className="c-test-hub__menu-item">Utwórz quiz</Link>
                        </aside>
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
            </AuthOverlord>
        );
    }
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
