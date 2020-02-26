import React from "react";
import {Link} from 'react-router-dom';
import '../../css/pages/home.scss';
import Header from '../parts/Header';
import { connect } from 'react-redux';
import AuthOverlord from '../auth/AuthOverlord';

interface TestsHubProps {
    user: {
        name: string|undefined
    }
}

const TestsHub: React.SFC <TestsHubProps> = ({user}) => {
    return (
        <AuthOverlord>
            <Header/>
            <main className="c-test-hub">
                <div className="o-container">
                    
                </div>
            </main>
        </AuthOverlord>
    );
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(TestsHub)