import setLocalStorage from '../../../helpers/setLocalStorage';
import { setQuestionFieldContent, isTestFileValid } from '../../../helpers/fileLoadModule';

export const showContainer = (element, {setShowWizard, setShowFileDrop}) => {
    disableAllOptions('upload-method');
    enableOption(element);

    if(element.classList.contains('js-open-dropfile')) {
        setShowFileDrop(true);
        setShowWizard(false);
    } else {
        setShowWizard(true);
        setShowFileDrop(false);
    }
}

export const selectQuizType = (element) => {
    disableAllOptions('type');
    enableOption(element);

    const value = element.getAttribute('data-value');
    const typeInput: HTMLInputElement = document.querySelector('.js-quiz-creator-type-input');
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    const ev2 = new Event('input', { bubbles: true});

    nativeInputValueSetter.call(typeInput, value);
    typeInput.dispatchEvent(ev2);
}

export const handleAddFormRecord = (forms, setForms) => {
    let newForms;
    let isPrevFormValid = true;

    if(!forms) {
        newForms = [];
    } else {
        newForms = [...forms];
    }

    const currentFormId = newForms.length;
    const newForm = {
        id: currentFormId,
        question: '',
        answers: '',
        correct: ''
    };

    if(currentFormId) {
        isPrevFormValid = validateQuestionForm(currentFormId - 1);
    }

    if(isPrevFormValid) {
        newForms.push(newForm);
        setForms(newForms);
    }
}

export const handleAcceptWizard = (forms) => {
    if(forms.length <= 4) {
        alert('musisz uzupełnić conajmniej 5 pytań')
    }

    const test = mapFormsIntoObject(forms);

    const validation = isTestFileValid(test);

    if(validation.status) {
        setLocalStorage(test, 'user-test');
        setQuestionFieldContent(JSON.stringify(test));
        enableSendForm();
    } else {
        console.warn(validation.error)
    }

}

export const handleInputClick = (event) => {
    event.preventDefault();
    const target = event.target;

    target.classList.remove('c-add-question-form__input--active');
}

export const handleCheckboxClick = (event) => {
    const target = event.target;
    const id = target.getAttribute('data-id');
    const items = Array.from(document.querySelectorAll(`.c-add-question-form__checkbox[data-id='${id}']`));

    items.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = false;
    })

    target.checked = true;
}

export const handleArrowClick = (event) => {
    const target = event.target;
    const form = target.closest('.c-add-question-form');

    form.classList.toggle('c-add-question-form--unfolded');
}

export const firstStepHandler = (e) => {
    const input: HTMLInputElement = document.querySelector('.js-quiz-creator-title-input');

    if(input.value) {
        const secondStep = document.querySelector('.js-creator-step-2');
        secondStep.classList.remove('c-quiz-creator__step--hidden');
    }
}

export const secondStepHandler = (e) => {
    const thirdStep = document.querySelector('.js-creator-step-3');
    thirdStep.classList.remove('c-quiz-creator__step--hidden');
}

/**
 * helpers
 */
const enableSendForm = () => {
    document.querySelector('.js-wizard-button-submit').classList.remove('o-input--inactive');
}

const mapFormsIntoObject = (forms) => {
    let finalFormsObject = {};

    forms.forEach((form, index) => {
        const isValid = validateQuestionForm(form.id);

        if(isValid) {
            const formQuestionElement: HTMLInputElement = document.querySelector(`[name=question-${form.id}`);
            const formAnswersElements =  Array.from(document.querySelectorAll(`[name=answer-${form.id}`));
            const formAnswersCheckboxesElements = Array.from(document.querySelectorAll(`.c-add-question-form__checkbox[data-id='${form.id}']`));
            const question = formQuestionElement.value;
            let answers = getAnswers(formAnswersElements);
            const correct = getCheckedInputIndex(formAnswersCheckboxesElements);

            finalFormsObject[(index + 1)] = {
                answers: answers,
                question: question.toString(),
                correct: correct.toString()
            }
        } else {
            console.warn('Invalid form values')
        }
    })

    return finalFormsObject;
}

const getAnswers = (answersElems) => {
    let answers = {1:'', 2:'', 3:'', 4:''};

    answersElems.forEach((answer: HTMLInputElement, index) => {
        answers[(index+1).toString()] = answer.value;
    });

    return answers;
}

const getCheckedInputIndex = (checkboxes) : number => {
    let checkboxIndex = -1;

    checkboxes.forEach((checkbox: HTMLInputElement, index: number) => {
        if(checkbox.checked) {
            checkboxIndex = index;
        }
    })

    return checkboxIndex + 1;
}

const validateQuestionForm = (id) => {
    const isFilled = areInputsFilled(id);
    const isSelected = isCorrectAnswerSelected(id);
    let isValid = true;

    if(!isFilled) {
        alert('Wypełnij wszystkie pola!');
        isValid = false;
    }

    if(!isSelected) {
        alert('Zaznacz poprawną odpowiedź!')
        isValid = false;
    }

    return isValid;
}

const areInputsFilled = (id) => {
    const inputs = Array.from(document.querySelectorAll(`.c-add-question-form[data-form-id='${id}'] input[type='text']`));
    let areAllInputsFilled = false;

    const filledInputs = inputs.filter((input: HTMLInputElement) => {
        return !!input.value.trim();
    })

    if(filledInputs.length === inputs.length) areAllInputsFilled = true;

    return areAllInputsFilled;
}

const isCorrectAnswerSelected = (id) => {
    const checkboxes = Array.from(document.querySelectorAll(`.c-add-question-form__checkbox[data-id='${id}']`));
    let isAnySelected = false;

    checkboxes.forEach((checkbox: HTMLInputElement) => {
        if(checkbox.checked) isAnySelected = true;
    })

    return isAnySelected;
}

const disableAllOptions = (name) => {
    let selector;

    switch (name) {
        case 'type':
            selector = '.js-quiz-type-option';
            break;
        case 'upload-method':
            selector = '.js-add-question-method-option';
            break;
    }

    if(selector) {
        const options = Array.from(document.querySelectorAll(selector));

        options.forEach(option => {
            option.classList.remove('active');
        })
    }
}

const enableOption = (option) => {
    if(option) option.classList.add('active');
}
