export const showContainer = (element) => {
    const dropfileContainerElement = document.querySelector('.js-quiz-creator-form__dropfile');
    const creatorContainerElement = document.querySelector('.js-quiz-creator__tool');

    disableAllOptions('upload-method');
    enableOption(element);

    if(element.classList.contains('js-open-dropfile')) {
        hide(creatorContainerElement);
        show(dropfileContainerElement);
    } else {
        show(creatorContainerElement);
        hide(dropfileContainerElement);
    }
}

export const selectQuizType = (element) => {
    disableAllOptions('type');
    enableOption(element);

    const value = element.getAttribute('data-value');
    const typeInput: HTMLInputElement = document.querySelector('.o-input[name=type]');

    typeInput.value = value;
}

const hide = (element) => {
    if(element) element.classList.add('o-hidden');
}

const show = (element) => {
    if(element) element.classList.remove('o-hidden');
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
