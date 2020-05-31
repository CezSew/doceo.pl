import React from "react";
import { handleCheckboxClick, handleInputClick, handleArrowClick } from "../utils";
import ArrowLeftSVG from "../../../utils/svg/ArrowLeft";

export const FormRecords = ({formRecords}) => {
    const forms = formRecords.map(form => {
        return (
            <div className="c-add-question-form c-add-question-form--unfolded js-add-question-form " data-form-id={form.id} key={`form${form.id}`}>
                <div className="c-add-question-form__question-input-wrapper">
                    <button className="c-add-question-form__arrow-fold-button" onClick={(e) => handleArrowClick(e)}>
                        <ArrowLeftSVG color="#fff" classes="c-add-question-form__arrow-fold-svg"/>
                    </button>
                    <input className="c-add-question-form__input c-add-question-form__input--active" type="text" name={`question-${form.id}`} placeholder="wpisz pytanie" onClick={(e) => handleInputClick(e)}/>
                </div>
                <div className="c-add-question-form__answers">
                    <div className="c-add-question-form__answer-line">
                        <input className="c-add-question-form__input c-add-question-form__input--active" type="text" name={`answer-${form.id}`} placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="c-add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                    <div className="c-add-question-form__answer-line">
                        <input className="c-add-question-form__input c-add-question-form__input--active" type="text" name={`answer-${form.id}`}  placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="c-add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                    <div className="c-add-question-form__answer-line">
                        <input className="c-add-question-form__input c-add-question-form__input--active" type="text" name={`answer-${form.id}`}  placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="c-add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                    <div className="c-add-question-form__answer-line">
                        <input className="c-add-question-form__input c-add-question-form__input--active" type="text" name={`answer-${form.id}`}  placeholder="wpisz odpowiedź" onClick={(e) => handleInputClick(e)}/>
                        <input className="c-add-question-form__checkbox" data-id={form.id} name='answer-correct-checkbox' type="checkbox" onClick={(e) => handleCheckboxClick(e)}/>
                    </div>
                </div>
            </div>
        )
    });

    return forms;
}
