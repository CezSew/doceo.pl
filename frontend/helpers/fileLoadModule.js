import setLocalStorage from './setLocalStorage';

const fileLoadModule = () => {
    const holder = document.getElementById('holder');

    holder.ondragover = function() {
        this.className = 'hover';
        return false;
    };

    holder.ondragend = function() {
        this.className = '';
        return false;
    };

    holder.ondrop = function(e) {
        this.className = '';
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const state = document.getElementById('status');
            const fileContents = event.target.result.split(/\r?\n/);
            const test = parseIntoObject(fileContents);
            const validation = isTestFileValid(test);

            if(validation.status) {
                state.textContent = 'Pomyślnie odczytano plik';
                // test.name = 'user-test';
                setLocalStorage(test, 'user-test');
                setQuestionFieldContent(JSON.stringify(test));
            } else {
                state.textContent = validation.error;
            };
        };

        reader.readAsText(file);

        setHolderFinishedClass();

        return false;
    };
}

const parseIntoObject = (file) => {
    const state = document.getElementById('status');
    let test = {};
    let counter = 0;

    if(!file) state.textContent = 'Odczyt się nie powiódł :(';

    file.filter(value => value).forEach((item, index) => {
        const questionIndex = getQuestionIndex(index);
        counter = correctCounter(counter);

        if(item) {
            if (index%5 === 0 || index === 0) {
                test[questionIndex] = objectDefine(test[questionIndex]);
                test[questionIndex].question = item;
            } else {
                test[questionIndex] = objectDefine(test[questionIndex]);
                test[questionIndex].answers = objectDefine(test[questionIndex].answers);
                test[questionIndex].answers[counter] = item;
                if(isCorrect(item)) {
                    test[questionIndex].answers[counter] = trimAnswer(item);
                    test[questionIndex].correct = String(counter);
                } else {
                    test[questionIndex].answers[counter] = item;
                };
            }
            counter++;
        }
    });

    return test;
}

const getQuestionIndex = (index) => {
    let questionIndex = Math.floor(index / 5) + 1;
    return questionIndex;
}

const correctCounter = (counter) => {
    counter = (counter === 5) ? 0 : counter;
    return counter;
}

const isCorrect = (answer) => {
    let correct = answer[0] === "+" ? true : false;
    return correct;
}

const trimAnswer = (answer) => {
    answer = answer.substr(1);
    return answer;
}

const objectDefine = (object) => {
    return object = object || {};
}

const setHolderFinishedClass = () => {
    const holder = document.getElementById('holder');

    holder.classList = 'holder-ended';
}

export const isTestFileValid = (testObject) => {
    let lengthOfTest = 0;
    let error = '';

    Object.keys(testObject).forEach(index => {
        const question = testObject[index].question;
        const answers = testObject[index].answers;

        lengthOfTest++;
    })

    if(lengthOfTest < 5) {
        error = 'Przesłany test jest zbyt krótki!';
        return {status: false, error: error};
    }

    return {status: true, error: ''};
}

export const setQuestionFieldContent = (json) => {
    const questionsInput = document.querySelector('[name=hidden-questions]');

    if(questionsInput) {
        questionsInput.value = json;
    }
}

export default fileLoadModule;
