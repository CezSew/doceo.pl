import React from "react";

export const CreatorStepHeader = ({title, description}) => {
    return (
        <div className="c-quiz-creator__step-header">
            <p className="c-quiz-creator__step-title">{title}</p>
            <p className="c-quiz-creator__step-text">{description}</p>
        </div>
    )
}
