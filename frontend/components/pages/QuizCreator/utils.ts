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

    console.log();
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
