const getQuestion = (questions, nextQuestionNumber) => {
    const questionsNumber = Object.keys(questions).length;
    let question;


    question = Object.values(questions)[nextQuestionNumber];

    return [question, nextQuestionNumber + 1]
}

export default getQuestion
