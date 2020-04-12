import React from "react";
import Header from "../../parts/Header";
import { Redirect } from 'react-router-dom';
import { decodeQuestions } from './utils/decodeQuestions';
// import '../../css/pages/singleQuiz.scss';
import { SingleTestProps, SingleTestState } from './utils/types';
import getQuestion from './utils/getQuestion';

class SingleTest extends React.Component<SingleTestProps, SingleTestState> {
    constructor(props) {
        super(props);

        this.state = {
           stats: {},
           lastQuestionIndex: 0
        };

        this.goToTheNextQuestion = this.goToTheNextQuestion.bind(this);
    }

    shouldRender() {
        if(typeof this.props.location === 'undefined' || typeof this.props.location.state === 'undefined') {
            return false;
        }
        return true;
    }

    goToTheNextQuestion() {
        const quiz = this.props.location.state.quiz;
        const questions = decodeQuestions(quiz.questions);

        if(this.state.lastQuestionIndex + 1 < Object.keys(questions).length - 1) {
            this.setState({lastQuestionIndex: this.state.lastQuestionIndex + 1})
        } else {
            alert('To było ostatnie pytanie')
        }
    }

    render() {
        if(!this.shouldRender()) return <Redirect to="tests-main" />;

        const quiz = this.props.location.state.quiz;
        const questions = decodeQuestions(quiz.questions);
        const currentQuestion = getQuestion(questions, this.state.lastQuestionIndex, this.state, this);
        const mappedAnswers = Object.values(currentQuestion[0]['answers']).map((answer, index) => {
            return (
                <li key={index + Math.random()}><h3>{answer}</h3></li>
            )
        });

        return (
            <React.Fragment>
                <Header/>
                <main className="c-test-hub">
                    <div className="o-container">
                        <h1>{quiz.title}</h1>
                        <br/>
                        <p>ID:{quiz.id}</p>

                        <br/><h1>Pytanie {currentQuestion[1]}</h1><br/>
                        <h2>{currentQuestion[0]['question']}</h2><br/>
                        <ul>
                            {mappedAnswers}
                        </ul>
                        <button onClick={this.goToTheNextQuestion}>Dawaj następne</button>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default SingleTest
