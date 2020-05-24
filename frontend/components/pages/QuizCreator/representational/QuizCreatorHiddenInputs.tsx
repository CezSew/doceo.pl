import React from "react";
import InputLine from "../../../parts/InputLine";

export const QuizCreatorHiddenInputs = () => {
    return (
        <React.Fragment>
            <InputLine name="name" type="text" placeholder="nazwa testu" icon="letter"/>
            <InputLine name="type" type="text" placeholder="typ testu" classes="o-hidden"/>
            <InputLine name="hidden-questions" type="text" placeholder="pytania" classes="o-hidden"/>
        </React.Fragment>
    )
}
