import React from 'react';

const Answer = ({isCorrect, text, handleAnswer}) => {

    return (
        <li className="c-test__answer" onClick={() => handleAnswer(isCorrect)}>
            {text}
        </li>
    )
}

export default Answer;
