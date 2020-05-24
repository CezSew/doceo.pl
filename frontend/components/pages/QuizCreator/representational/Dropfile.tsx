import React, { useEffect } from "react";
import fileLoadModule from '../../../../helpers/fileLoadModule';

export const Dropfile = () => {
    useEffect(() => {
        fileLoadModule();
    }, [])

    return (
        <div className="c-quiz-creator-form__dropfile js-quiz-creator-form__dropfile">
            <p className="c-file-holder-status" id="status">Przeciągnij plik .txt</p>
            <div className="js-file-holder" id="holder"></div>
        </div>
    )
}
