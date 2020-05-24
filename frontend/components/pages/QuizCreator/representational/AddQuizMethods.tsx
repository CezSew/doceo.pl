import React from "react";
import { showContainer } from "../utils";

export const AddQuizMethods = (props) => {
    return (
        <div className="c-quiz-creator__quiz-types">
            <div className="c-quiz-creator__quiz-type js-add-question-method-option js-open-creator"  onClick={(e) => showContainer(e.target, props)}>
                kreator
            </div>
            <div className="c-quiz-creator__quiz-type js-add-question-method-option js-open-dropfile c-quiz-creator__quiz-type--file" onClick={(e) => showContainer(e.target, props)}>
                plik
            </div>
        </div>
    )
}
