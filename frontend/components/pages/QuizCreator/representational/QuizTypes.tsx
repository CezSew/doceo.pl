import React from "react";
import { selectQuizType } from "../utils";

export const QuizTypes = () => {
    return (
        <div className="c-quiz-creator__quiz-types-group">
            <p className="c-quiz-creator__quiz-types-title">Typ testu:</p>
            <div className="c-quiz-creator__quiz-types">
                <div className="c-quiz-creator__quiz-type c-quiz-creator__quiz-type--inactive js-quiz-type-option" data-value="prosty" onClick={(e) => selectQuizType(e.target)}>
                    prosty
                </div>
                <div className="c-quiz-creator__quiz-type js-quiz-type-option" data-value="smart" onClick={(e) => selectQuizType(e.target)}>
                    smart
                </div>
                <div className="c-quiz-creator__quiz-type c-quiz-creator__quiz-type--inactive js-quiz-type-option" data-value="nauka" onClick={(e) => selectQuizType(e.target)}>
                    nauka
                </div>
            </div>
        </div>
    )
}
