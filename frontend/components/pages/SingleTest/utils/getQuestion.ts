const getQuestion = (questions, lastQuestionIndex, questionsProbabilityArray) => {
    const questionsNumber = Object.keys(questions).length;
    let nextQuestionNumber;
    if(questionsProbabilityArray.length) {
        do {
            let randomNumber = Math.floor(Math.random() * (questionsProbabilityArray.length - 1));
            nextQuestionNumber = questionsProbabilityArray[randomNumber];
        } while(nextQuestionNumber === lastQuestionIndex);
    } else {
        nextQuestionNumber = 0;
    }

    console.log(nextQuestionNumber);

    let question;


    question = Object.values(questions)[nextQuestionNumber];

    return [question, nextQuestionNumber]
}

export default getQuestion
