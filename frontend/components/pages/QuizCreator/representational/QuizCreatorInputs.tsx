import React from "react";
import InputLine from "../../../parts/InputLine";

export const QuizCreatorInputs = ({stepHandlers}) => {
    return (
        <React.Fragment>
            <InputLine name="name" type="text" placeholder="nazwa testu" icon="letter" wrapperClasses="c-quiz-creator__input-line" handleOnChange={stepHandlers[0]} classes="js-quiz-creator-title-input"/>
            <InputLine name="type" type="text" placeholder="typ testu" handleOnChange={stepHandlers[1]} classes="o-hidden js-quiz-creator-type-input"/>
            <InputLine name="hidden-questions" type="text" placeholder="pytania" classes="o-hidden"/>
        </React.Fragment>
    )
}
