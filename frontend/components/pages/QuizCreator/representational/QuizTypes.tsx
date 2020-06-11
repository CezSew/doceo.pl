import React from "react";
import { selectQuizType } from "../utils";
import { QuizSVG } from "../../../utils/svg/Quiz";
import { BulbSVG } from "../../../utils/svg/Bulb";
import { ExamSVG } from "../../../utils/svg/Exam";

export const QuizTypes = () => {
    return (
        <div className="c-quiz-creator__quiz-types-group">
            <div className="c-quiz-creator__quiz-types">
                <div className="c-quiz-creator__quiz-type c-quiz-creator__quiz-type--inactive js-quiz-type-option" data-value="simple" onClick={(e) => selectQuizType(e.target)}>
                    <QuizSVG color="#3B8BEB" classes="c-quiz-creator__quiz-type-icon"/>
                    <p className="o-text">Prosty</p>
                    <span className="c-quiz-creator__quiz-type-span">
                        dostępny wkrótce
                    </span>
                </div>
                <div className="c-quiz-creator__quiz-type js-quiz-type-option" data-value="study" onClick={(e) => selectQuizType(e.target)}>
                    <BulbSVG color="#3B8BEB" classes="c-quiz-creator__quiz-type-icon"/>
                    <p className="o-text">Nauka</p>
                </div>
                <div className="c-quiz-creator__quiz-type c-quiz-creator__quiz-type--inactive js-quiz-type-option" data-value="exam" onClick={(e) => selectQuizType(e.target)}>
                   <ExamSVG color="#3B8BEB" classes="c-quiz-creator__quiz-type-icon"/>
                   <p className="o-text">Egzamin</p>
                    <span className="c-quiz-creator__quiz-type-span">
                        dostępny wkrótce
                    </span>
                </div>
            </div>
        </div>
    )
}
