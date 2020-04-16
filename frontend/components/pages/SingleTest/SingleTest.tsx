import React from "react";
import Header from "../../parts/Header";
import { Redirect } from 'react-router-dom';
import { decodeQuestions } from './utils/decodeQuestions';
import { SingleTestProps, SingleTestState } from './utils/types';
import getQuestion from './utils/getQuestion';
import highlightAnswerElement from './utils/highlightAnswerElement';
import Answers from "./Question/Answers";
import '../../../css/pages/test.scss';
import {Loader} from "../../utils/Loader";

class SingleTest extends React.Component<SingleTestProps, SingleTestState> {
    constructor(props) {
        super(props);

        this.state = {
            stats: {},
            lastQuestionIndex: 0,
            questionsProbabilityArray: [],
            currentQuestion: [],
            questions: []
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

    goToTheNextQuestion(isCorrect) {
        const quiz = this.props.location.state.quiz;
        const questions = Object.assign({}, this.state.questions);
        let newQuestionsProbabilityArray = [...this.state.questionsProbabilityArray];

        if(!isCorrect) {
            newQuestionsProbabilityArray.push(this.state.lastQuestionIndex);
        } else {
            const indexToDelete = newQuestionsProbabilityArray.indexOf(this.state.lastQuestionIndex);
            newQuestionsProbabilityArray.splice(indexToDelete, 1);
        }

        const nextQuestion = getQuestion(this.state.questions, this.state.lastQuestionIndex, newQuestionsProbabilityArray);

        if(newQuestionsProbabilityArray.length > 1) {
            this.setState({
                questionsProbabilityArray: newQuestionsProbabilityArray,
                currentQuestion: nextQuestion,
                lastQuestionIndex: nextQuestion[1]
            })
        } else {
            //show stats
            alert('congrats!')
        }


        console.log(newQuestionsProbabilityArray)
    }

    handleAnswer(target, isCorrect) {
        highlightAnswerElement(target, isCorrect);

        setTimeout(() => {
            this.goToTheNextQuestion(isCorrect);
        }, 1500);
    }

    initModule() {
        if(!this.state.currentQuestion.length && this.shouldRender()) {
            const quiz = this.props.location.state.quiz;
            const questions = decodeQuestions(quiz.questions);
            const keys = Object.keys(questions).map(key => Number(key) - 1).filter(num => { return !isNaN(num)});
            const questionsProbabilityArray = [...keys, ...keys];
            const currentQuestion = getQuestion(questions, this.state.lastQuestionIndex, this.state.questionsProbabilityArray);

            this.setState({
                questionsProbabilityArray: questionsProbabilityArray,
                currentQuestion: currentQuestion,
                questions: questions
            })
        }
    }

    render() {
        if(!this.shouldRender()) return <Redirect to="tests-main" />;
        this.initModule();

        if(this.state.currentQuestion.length) {
            return (
                <React.Fragment>
                    <Header/>
                    <main className="c-test">
                        <div className="o-container">
                            <h2 className="c-test__question-title">{this.state.currentQuestion[0]['question']}</h2><br/>
                            <Answers question={this.state.currentQuestion[0]} handleAnswer={this.handleAnswer}/>
                        </div>
                    </main>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Header/>
                    <main className="c-test">
                        <div className="o-container">
                            <Loader />
                        </div>
                    </main>
                </React.Fragment>
            )
        }
    }
}

export default SingleTest
