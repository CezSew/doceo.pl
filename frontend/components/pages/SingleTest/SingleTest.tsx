import '../../../css/pages/test.scss';
import React, {useEffect, useState} from "react";
import Header from "../../parts/Header";
import { SingleTestProps, SingleTestState } from './utils/types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAnwerAccuracyPercent, isQuestionEliminated, shouldGenerateNextQuestion } from './utils/utils';
import decodeQuestions from './utils/decodeQuestions';
import getQuestion from './utils/getQuestion';
import highlightAnswerElement from './utils/highlightAnswerElement';
import Answers from "./Question/Answers";
import Loader from "../../utils/Loader";
import sendQuizFinishedByUser from "./utils/sendQuizFinishedByUser";
import getQuestionsArray from "./utils/getQuestionsArray";
import getUserId from "./utils/getUserId";
import Results from "./Results/Results";
import HomeSVG from '../../utils/svg/Home';
import RetrySVG from "../../utils/svg/Retry";
import ChangeSVG from "../../utils/svg/Change";
import ArrowLeftSVG from "../../utils/svg/ArrowLeft";

const SingleTest = (props: SingleTestProps) => {
    const [state, setState] = useState({
        stats: {},
        lastQuestionIndex: 0,
        questionsProbabilityArray: [],
        currentQuestion: [],
        questions: [],
        finished: false,
        questionsEliminated: 0,
        answersGiven: 0,
        answersCorrect: 0
    } as SingleTestState);

    useEffect(() => {
        initModule();
    }, []);

    const shouldRender = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idParam = urlParams.get('testId');

        if((typeof props.location === 'undefined' || typeof props.location.state === 'undefined') && !idParam) {
            return false;
        }
        return true;
    }

    const goToTheNextQuestion = (isCorrect) => {
        let newQuestionsProbabilityArray = getQuestionsArray(state.questionsProbabilityArray, isCorrect, state.lastQuestionIndex);
        if(shouldGenerateNextQuestion(newQuestionsProbabilityArray, state.lastQuestionIndex)) {
            const nextQuestion = getQuestion(state.questions, state.lastQuestionIndex, newQuestionsProbabilityArray);
            const questionsEliminatedModifier: number = Number(isQuestionEliminated(state.lastQuestionIndex, newQuestionsProbabilityArray));

            const correctAnswersModifier = Number(isCorrect);

            setState({
                ...state,
                questionsProbabilityArray: newQuestionsProbabilityArray,
                currentQuestion: nextQuestion,
                lastQuestionIndex: nextQuestion[1],
                questionsEliminated: state.questionsEliminated + questionsEliminatedModifier,
                answersGiven: state.answersGiven + 1,
                answersCorrect: state.answersCorrect + correctAnswersModifier
            })
        } else {
            const quizId = props.location.state.quiz['id'];
            const userId = getUserId(props.user);

            const accuracy = getAnwerAccuracyPercent(state.answersCorrect, state.answersGiven);

            sendQuizFinishedByUser(userId, quizId, accuracy);
            setState({
                ...state,
               finished: true
            })
        }
    }

    const handleAnswer = (target, isCorrect) => {
        highlightAnswerElement(target, isCorrect);
        setTimeout(() => {
            goToTheNextQuestion(isCorrect);
        }, 1500);

    }

    const initModule = () => {
        if(!state.currentQuestion.length && shouldRender()) {
            // const queryString = window.location.search;
            // const urlParams = new URLSearchParams(queryString);
            // const idParam = urlParams.get('testId');

            // if idParam, request quiz information by ID

            const quiz = props.location.state.quiz;
            const questions = decodeQuestions(quiz.questions);
            const keys = Object.keys(questions).map(key => Number(key) - 1).filter(num => { return !isNaN(num)});
            const questionsProbabilityArray = [...keys,...keys];
            const currentQuestion = getQuestion(questions, state.lastQuestionIndex, state.questionsProbabilityArray);

            setState({
                ...state,
                questionsProbabilityArray: questionsProbabilityArray,
                currentQuestion: currentQuestion,
                questions: questions
            })
        }
    }

    if(!shouldRender()) return <Redirect to="tests-main" />;

    if(state.currentQuestion.length && !state.finished) {
        const quiz = props.location.state.quiz;
        const date = quiz['created_at'].split(' ')[0].replace(/-/g, '.');
        const accuracy = getAnwerAccuracyPercent(state.answersCorrect, state.answersGiven);

        return (
            <React.Fragment>
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
                                    <span className="c-test__go-back-text" onClick={() => props.history.goBack()}>poprzednia strona</span>
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
                                <button className="c-test__aside-button" onClick={() => {console.log(`${window.location.href}?testId=${quiz['id']}`)}}>
                                    <ChangeSVG />
                                    <span className="c-test__aside-button-value">Udostępnij</span>
                                </button>
                            </aside>
                            <section className="c-test__test">
                                <h2 className="c-test__test-questions-header">Pytania</h2>
                                <h3 className="c-test__question-title">{state.currentQuestion[0]['question']}</h3>
                                <Answers question={state.currentQuestion[0]} handleAnswer={handleAnswer}/>
                            </section>
                            <aside className="c-test__aside-stats c-test-stats">
                                <div className="c-test-stats__box">
                                    <div className="c-test-stats__header">
                                        Pozostałe pytania:
                                    </div>
                                    <div className="c-test-stats__value">
                                        {Object.keys(state.questions).length - 1 - state.questionsEliminated}
                                    </div>
                                </div>
                                <div className="c-test-stats__box">
                                    <div className="c-test-stats__header">
                                        Wyeliminowane:
                                    </div>
                                    <div className="c-test-stats__value">
                                        {state.questionsEliminated}
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
            </React.Fragment>
        );
    } else if(state.finished) {
        return <Results score={getAnwerAccuracyPercent(state.answersCorrect, state.answersGiven)}/>
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

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SingleTest)
