import {getOccurrence} from "./getOccurence";

const getQuestion = (questions, lastQuestionIndex, questionsProbabilityArray) => {
    let nextQuestionNumber;

    if(questionsProbabilityArray.length) {
        if( getOccurrence(questionsProbabilityArray, questionsProbabilityArray[0]) === questionsProbabilityArray.length) {
            nextQuestionNumber = questionsProbabilityArray[0];
        } else {
            do {
                let randomNumber = Math.floor(Math.random() * (questionsProbabilityArray.length - 1));
                nextQuestionNumber = questionsProbabilityArray[randomNumber];
            } while(nextQuestionNumber === lastQuestionIndex);
        }
    } else {
        nextQuestionNumber = 0;
    }

    let question = Object.values(questions)[nextQuestionNumber];

    return [question, nextQuestionNumber]
}

export default getQuestion
