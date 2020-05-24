import React from "react";
import { QuizCreatorHiddenInputs } from "./QuizCreatorHiddenInputs";

export const QuizCreatorHeader = () => {
    return (
        <div className="c-quiz-creator__quiz-types-group">
            <p className="c-quiz-creator__quiz-types-title">Nazwa testu:</p>
            <QuizCreatorHiddenInputs />
        </div>
    )
}
