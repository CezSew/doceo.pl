import React from 'react';
import getMappedAnswers from "../utils/getMappedAnswers";

const Answers = ({question, handleAnswer}) => {
    const mappedAnswers = getMappedAnswers(question, handleAnswer);

    return (
        <ul className="c-test__answers">
            {mappedAnswers}
        </ul>
    )
}

export default Answers;
