import React from "react";
import Header from "../../parts/Header";
import { Redirect } from 'react-router-dom';
import { decodeQuestions } from './utils/decodeQuestions';
import { SingleTestProps, SingleTestState } from './utils/types';
import getQuestion from './utils/getQuestion';
import highlightAnswerElement from './utils/highlightAnswerElement';
import Answers from "./Question/Answers";
import '../../../css/pages/test.scss';

class SingleTest extends React.Component<SingleTestProps, SingleTestState> {
    constructor(props) {
        super(props);

        this.state = {
           stats: {},
           lastQuestionIndex: 0
        };

        this.goToTheNextQuestion = this.goToTheNextQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
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
            //last question action
            alert('To było ostatnie pytanie')
        }
    }

    handleAnswer(target, isCorrect) {
        highlightAnswerElement(target, isCorrect);

        setTimeout(() => {
            this.goToTheNextQuestion();
        }, 1500);
        //create stats
    }

    render() {
        if(!this.shouldRender()) return <Redirect to="tests-main" />;

        const quiz = this.props.location.state.quiz;
        const questions = decodeQuestions(quiz.questions);
        const currentQuestion = getQuestion(questions, this.state.lastQuestionIndex);

        return (
            <React.Fragment>
                <Header/>
                <main className="c-test">
                    <div className="o-container">
                        <h1 className="c-test__title">{quiz.title}</h1>
                        <p className="c-test__question-number">Pytanie {currentQuestion[1]}</p>
                        <h2 className="c-test__question-title">{currentQuestion[0]['question']}</h2><br/>
                        <Answers question={currentQuestion[0]} handleAnswer={this.handleAnswer}/>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default SingleTest
