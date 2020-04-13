import React from 'react';

const Answer = ({isCorrect, text, handleAnswer}) => {

    return (
        <li className="c-test__answer" onClick={(e) => handleAnswer(e.target, isCorrect)}>
            {text}
        </li>
    )
}

export default Answer;
