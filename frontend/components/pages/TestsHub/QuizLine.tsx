import React from "react";
import { Link } from 'react-router-dom';
import { testNameLetters } from '../../../helpers/testNameLetters';

interface QuizLineInterface {
    quiz: {
        id: string,
        title: string,
        type: string,
        rating: string,
        votes: string,
        msg?: string
    },
    userPanel: boolean
}

export const QuizLine: React.FC<QuizLineInterface> = ({quiz, userPanel}) => {
    const link = userPanel
        ? {}
        : {
            pathname: '/test-page',
            state: {
                quiz: quiz
            }
        }

    return(
        <li className={`c-quiz-line ` + (userPanel && 'c-quiz-line--user-panel')}>
            <Link to={link} className="c-test-hub__quiz-link"
            >
                <div className="c-quiz-line__short"><span className="c-quiz-line__circle">{testNameLetters(quiz.title)}</span></div>
                <div className="c-quiz-line__title-container"><span className="c-quiz-line__title">{quiz.title}</span></div>
                <div className="c-quiz-line__type">{quiz.type}</div>
                <div className="c-quiz-line__score">-</div>
                <div className="c-quiz-line__rating">{quiz.rating} ({quiz.votes} głosów)</div>
                {userPanel &&
                 (<div className="c-quiz-line__remove">
                    <button className="c-quiz-line__remove-button" onClick={() => {alert('remove')}}>
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
            </Link>
        </li>
    );
}
