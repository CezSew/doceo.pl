import React from "react";
import {Link} from 'react-router-dom';
import '../../css/pages/home.scss';
import Header from '../parts/Header';
import { connect } from 'react-redux';
import AuthOverlord from '../auth/AuthOverlord';
import '../../css/pages/testHub.scss';
import { requestTopQuizes } from '../../actions';

interface TestsHubProps {
    user: {
        name: string|undefined
    }, 
    quizes_all_by_rating: Array<string>|undefined,
    request_in_progress: boolean,
    onRequestTopQuizes: Function       
}

const TestsHub: React.SFC <TestsHubProps> = ({user, quizes_all_by_rating, request_in_progress, onRequestTopQuizes}) => {
    const quizes = Object.keys(quizes_all_by_rating).map((keyName, i) => {
        return <li key={i}><b>{quizes_all_by_rating[keyName].title}</b></li>
    });
    
    return (
        <AuthOverlord>
            <Header/>
            <main className="c-test-hub">
                <div className="o-container">
                    <Link to="/create-quiz">Utwórz quiz</Link>
                    <button onClick={() => onRequestTopQuizes()}>Get top quizes</button>
                </div>
                <ul>{quizes}</ul>
            </main>
        </AuthOverlord>
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