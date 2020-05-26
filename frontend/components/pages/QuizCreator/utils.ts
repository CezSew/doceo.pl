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
    const typeInput: HTMLInputElement = document.querySelector('.o-input[name=type]');

    typeInput.value = value;
}

export const handleAddFormRecord = (forms, setForms) => {
    let newForms;

    if(!forms) {
        newForms = [];
    } else {
        newForms = [...forms];
    }

    const newForm = {
        id: newForms.length,
        question: '',
        answers: '',
        correct: ''
    };

    newForms.push(newForm);
    console.log(newForms);
    setForms(newForms);
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
