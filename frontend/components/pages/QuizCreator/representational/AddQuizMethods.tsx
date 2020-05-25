import React from "react";
import { showContainer } from "../utils";
import { TextFileSVG } from "../../../utils/svg/TextFile";
import { AddSVG } from "../../../utils/svg/Add";

export const AddQuizMethods = (props) => {
    return (
        <div className="c-quiz-creator__quiz-types">
            <div className="c-quiz-creator__quiz-type js-add-question-method-option js-open-creator"  onClick={(e) => showContainer(e.target, props)}>
                <TextFileSVG color="#3B8BEB" classes="c-quiz-creator__quiz-type-icon"/>
                <p className="o-text">Kreator</p>
            </div>
            <div className="c-quiz-creator__quiz-type js-add-question-method-option js-open-dropfile c-quiz-creator__quiz-type--file" onClick={(e) => showContainer(e.target, props)}>
                <AddSVG color="#3B8BEB" classes="c-quiz-creator__quiz-type-icon"/>
                <p className="o-text">Plik</p>
            </div>
        </div>
    )
}
