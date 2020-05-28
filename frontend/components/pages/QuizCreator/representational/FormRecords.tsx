import React from "react";
import { handleCheckboxClick, handleInputClick } from "../utils";

export const FormRecords = ({formRecords}) => {
    const forms = formRecords.map(form => {
        return (
            <div className="add-question-form" data-form-id={form.id} key={`form${form.id}`}>
                <input className="add-question-form__input add-question-form__input--active" type="text" name={`question-${form.id}`} placeholder="wpisz pytanie" onClick={(e) => handleInputClick(e)}/>
                <div className="add-question-form__answers">
                    <div className="add-question-form__answer-line">
                        <input className="add-question-form__input add-question-form__input--active" type="text" name={`answer-${form.id}`} placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                    <div className="add-question-form__answer-line">
                        <input className="add-question-form__input add-question-form__input--active" type="text" name={`answer-${form.id}`}  placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                    <div className="add-question-form__answer-line">
                        <input className="add-question-form__input add-question-form__input--active" type="text" name={`answer-${form.id}`}  placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                    <div className="add-question-form__answer-line">
                        <input className="add-question-form__input add-question-form__input--active" type="text" name={`answer-${form.id}`}  placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                </div>
            </div>
        )
    });

    return forms;
}
