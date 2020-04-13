import Answer from "../Question/Answer";
import React from "react";

const getMappedAnswers = (currentQuestion, handleAnswer) => {
    const question = Object.assign({}, currentQuestion);
    const result = Object.values(question['answers']).map((answer, index) => {
        const isCorrect = Number(question['correct']) === index + 1;
        return (
            <Answer
                key={index + Math.random()}
                isCorrect={isCorrect}
                text={answer}
                handleAnswer={handleAnswer}
            />
        )
    });

    return result;
}

export default getMappedAnswers;
