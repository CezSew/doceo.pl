import React from "react";
import Header from "../../parts/Header";
import { Redirect } from 'react-router-dom';
import { decodeQuestions } from './utils/decodeQuestions';
// import '../../css/pages/singleQuiz.scss';
import { SingleTestProps } from './utils/types'

class SingleTest extends React.Component<SingleTestProps> {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    render() {
        const quiz = this.props.location.state.quiz;
        const questions = decodeQuestions(quiz.questions);

        console.log(questions)
        return (
            <React.Fragment>
                <Header/>
                <main className="c-test-hub">
                    <div className="o-container">
                        <h1>{quiz.title}</h1>
                        <br/>
                        <p>ID:{quiz.id}</p>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default SingleTest
