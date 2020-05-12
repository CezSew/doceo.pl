import React from "react";
import Header from "../../parts/Header";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { decodeQuestions } from './utils/decodeQuestions';
import { SingleTestProps, SingleTestState } from './utils/types';
import getQuestion from './utils/getQuestion';
import highlightAnswerElement from './utils/highlightAnswerElement';
import Answers from "./Question/Answers";
import '../../../css/pages/test.scss';
import { Loader } from "../../utils/Loader";
import { sendQuizFinishedByUser } from "./utils/sendQuizFinishedByUser";
import AuthOverlord from '../../auth/AuthOverlord';
import {getAnwerAccuracyPercent, isQuestionEliminated, shouldGenerateNextQuestion} from './utils/utils';
import { getQuestionsArray } from "./utils/getQuestionsArray";
import { getUserId } from "./utils/getUserId";
import Results from "./Results/Results";
import { Link } from 'react-router-dom';
import HomeSVG from '../../utils/svg/Home';
import RetrySVG from "../../utils/svg/Retry";
import ChangeSVG from "../../utils/svg/Change";
import ArrowLeftSVG from "../../utils/svg/ArrowLeft";

class SingleTest extends React.Component<SingleTestProps, SingleTestState> {
    constructor(props) {
        super(props);

        this.state = {
            stats: {},
            lastQuestionIndex: 0,
            questionsProbabilityArray: [],
            currentQuestion: [],
            questions: [],
            finished: false,
            questionsEliminated: 0,
            answersGiven: 0,
            answersCorrect: 0
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
        let newQuestionsProbabilityArray = getQuestionsArray(this.state.questionsProbabilityArray, isCorrect, this.state.lastQuestionIndex);

        if(shouldGenerateNextQuestion(newQuestionsProbabilityArray, this.state.lastQuestionIndex)) {
            const nextQuestion = getQuestion(this.state.questions, this.state.lastQuestionIndex, newQuestionsProbabilityArray);
            const questionsEliminatedModifier: number = Number(isQuestionEliminated(this.state.lastQuestionIndex, newQuestionsProbabilityArray));
            const correctAnswersModifier = Number(isCorrect);

            this.setState({
                questionsProbabilityArray: newQuestionsProbabilityArray,
                currentQuestion: nextQuestion,
                lastQuestionIndex: nextQuestion[1],
                questionsEliminated: this.state.questionsEliminated + questionsEliminatedModifier,
                answersGiven: this.state.answersGiven + 1,
                answersCorrect: this.state.answersCorrect + correctAnswersModifier
            })
        } else {
            const quizId = this.props.location.state.quiz['id'];
            const userId = getUserId(this.props.user);

            sendQuizFinishedByUser(userId, quizId);

            this.setState({
               finished: true
            })
        }
    }

    handleAnswer(target, isCorrect) {
        highlightAnswerElement(target, isCorrect);

        setTimeout(() => {
            this.goToTheNextQuestion(isCorrect);
        }, 1500);
    }

    componentDidMount(): void {
        this.initModule();
    }

    initModule() {
        if(!this.state.currentQuestion.length && this.shouldRender()) {
            const quiz = this.props.location.state.quiz;
            const questions = decodeQuestions(quiz.questions);
            const keys = Object.keys(questions).map(key => Number(key) - 1).filter(num => { return !isNaN(num)});
            const questionsProbabilityArray = [...keys,...keys];
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

        if(this.state.currentQuestion.length && !this.state.finished) {
            const quiz = this.props.location.state.quiz;
            const date = quiz['created_at'].split(' ')[0].replace(/-/g, '.');
            const accuracy = getAnwerAccuracyPercent(this.state.answersCorrect, this.state.answersGiven);

            return (
                <AuthOverlord>
                    <Header/>
                    <section className="c-test">
                        <div className="o-container">
                            <div className="c-test__header">
                                <div className="c-test__data-container">
                                    <h1 className="c-test__title o-title o-title--h2 o-title--line">{quiz['title']} <span className="c-test__id">(#{quiz['id']})</span></h1>
                                    <p className="c-test__data-author o-text o-text--light o-text--gray o-text--semi-large">autor: {quiz['authorName']}</p>
                                </div>
                                <div className="c-test__data-container">
                                    <p className="o-text o-text--light o-text--gray o-text--semi-large">data dodania:</p>
                                    <p className="o-text o-text--light o-text--light-gray">{date}</p>
                                </div>
                                <div className="c-test__data-container">
                                    <p className="o-text o-text--light o-text--gray o-text--semi-large">typ testu:</p>
                                    <p className="o-text o-text--light o-text--light-gray">{quiz['type']}</p>
                                </div>
                                <div className="c-test__data-container">
                                    <p className="o-text o-text--light o-text--gray o-text--semi-large">ocena:</p>
                                    <p className="o-text o-text--light o-text--light-gray">{quiz['rating']}/5 (głosów: {quiz['votes']})</p>
                                </div>
                            </div>
                            <main className="c-test__main">
                                <aside className="c-test__aside-menu">
                                    <button className="c-test__go-back">
                                        <ArrowLeftSVG />
                                        <span className="c-test__go-back-text">poprzednia strona</span>
                                    </button>
                                    <Link className="c-test__aside-button" to="/">
                                        <HomeSVG />
                                        <span className="c-test__aside-button-value">Strona główna</span>
                                    </Link>
                                    <Link className="c-test__aside-button" to="/">
                                        <RetrySVG />
                                        <span className="c-test__aside-button-value">Zacznij od nowa</span>
                                    </Link>
                                    <Link className="c-test__aside-button" to="/tests-main">
                                        <ChangeSVG />
                                        <span className="c-test__aside-button-value">Wybierz inny test</span>
                                    </Link>
                                </aside>
                                <section className="c-test__test">
                                    <h2 className="c-test__test-questions-header">Pytania</h2>
                                    <h3 className="c-test__question-title">{this.state.currentQuestion[0]['question']}</h3>
                                    <Answers question={this.state.currentQuestion[0]} handleAnswer={this.handleAnswer}/>
                                </section>
                                <aside className="c-test__aside-stats c-test-stats">
                                    <div className="c-test-stats__box">
                                        <div className="c-test-stats__header">
                                            Pozostałe pytania:
                                        </div>
                                        <div className="c-test-stats__value">
                                            {Object.keys(this.state.questions).length - 1 - this.state.questionsEliminated}
                                        </div>
                                    </div>
                                    <div className="c-test-stats__box">
                                        <div className="c-test-stats__header">
                                            Wyeliminowane:
                                        </div>
                                        <div className="c-test-stats__value">
                                            {this.state.questionsEliminated}
                                        </div>
                                    </div>
                                    <div className="c-test-stats__box">
                                        <div className="c-test-stats__header">
                                            Skuteczność:
                                        </div>
                                        <div className="c-test-stats__value">
                                            {accuracy}%
                                        </div>
                                    </div>
                                </aside>
                            </main>
                        </div>
                    </section>
                </AuthOverlord>
            );
        } else if(this.state.finished) {
            return <Results/>
        } else {
            return (
                <AuthOverlord>
                    <Header/>
                    <main className="c-test">
                        <div className="o-container">
                            <Loader />
                        </div>
                    </main>
                </AuthOverlord>
            )
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SingleTest)
