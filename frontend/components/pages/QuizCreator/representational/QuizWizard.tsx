import React from "react";
import { AddSVG } from "../../../utils/svg/Add";
import { handleAcceptWizard, handleAddFormRecord } from "../utils";
import { FormRecords } from "./FormRecords";

export const QuizWizard = ({formRecords, setFormRecords}) => {
    return (
        <div className="c-quiz-creator-wizard">
            <div className="c-quiz-creator-wizard__description-wrapper">
                <p className="c-quiz-creator__description o-underlined">Dodaj test z użyciem kreatora</p>
                <p className="c-quiz-creator__description">Test musi zawierać co najmniej 5 pytań. Kliknij przycisk "dodaj pytanie" aby wyświetlić pola pytania i odpowiedzi. Wypełnij pola i zaznacz poprawną odpowiedź po prawej stronie pola odpowiedzi. Tylko jedna odpowiedź może być prawidłowa. Dla poprawy czytelności listy możliwe jest zwijanie odpowiedzi do jednej linii, za pomocą strzałki po lewej stronie pytania.</p>
            </div>
            {formRecords && <FormRecords formRecords={formRecords}/>}
            <div className="c-quiz-creator-wizard__buttons-container">
                <button className="c-quiz-creator-wizard__add-button" onClick={() => handleAddFormRecord(formRecords, setFormRecords)}>
                    <span className="c-quiz-creator-wizard__add-text">dodaj pytanie</span>
                    <AddSVG color="#3B8BEB" classes="c-quiz-creator-wizard__add-icon"/>
                </button>
                <button className="c-quiz-creator-wizard__accept-button" onClick={() => handleAcceptWizard(formRecords)}>
                    <span className="c-quiz-creator-wizard__accept-text">zatwierdź pytania</span>
                </button>
            </div>
        </div>
    )
}
