import React from "react";
import { Link } from 'react-router-dom';
import { testNameLetters } from '../../../helpers/testNameLetters';
import ConditionalQuizLineWrapper from "./ConditionalQuizLineWrapper";
import {requestTopQuizes} from "../../../actions";

interface QuizLineInterface {
    quiz: {
        id: string,
        title: string,
        type: string,
        rating: string,
        votes: string,
        msg?: string
    },
    userPanel: boolean,
    handleRemoveQuiz?: Function|undefined
}

export const QuizLine: React.FC<QuizLineInterface> = ({quiz, userPanel, handleRemoveQuiz = undefined}) => {
    console.log(!!handleRemoveQuiz)

    const link = userPanel
        ? {}
        : {
            pathname: '/test-page',
            state: {
                quiz: quiz
            }
        }

    return(
        <li className={`c-quiz-line ` + (handleRemoveQuiz && 'c-quiz-line--user-panel')}>
            <ConditionalQuizLineWrapper userPanel={userPanel} link={link}>
                <div className="c-quiz-line__short"><span className="c-quiz-line__circle">{testNameLetters(quiz.title)}</span></div>
                <div className="c-quiz-line__title-container"><span className="c-quiz-line__title">{quiz.title}</span></div>
                <div className="c-quiz-line__type">{quiz.type}</div>
                <div className="c-quiz-line__score">-</div>
                <div className="c-quiz-line__rating">{quiz.rating} ({quiz.votes} głosów)</div>
                {handleRemoveQuiz &&
                 (<div className="c-quiz-line__remove">
                    <button className="c-quiz-line__remove-button" onClick={(e) => {handleRemoveQuiz(quiz.id)}}>
                        Usuń
                    </button>
                     <Link className="c-quiz-line__show-button" to={{
                         pathname: '/test-page',
                         state: {
                             quiz: quiz
                         }
                     }} >
                         Pokaż
                     </Link>
                 </div>)
                }
            </ConditionalQuizLineWrapper>
        </li>
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

