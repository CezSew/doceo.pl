/**
 * returns a modified array of possible questions depending on a last answer
 * @param array {Array} input array of questions
 * @param isCorrect {boolean} was the last question answered correctly
 * @param lastQuestionIndex {number} index of last occured question
 * @returns {Array} updated array of questions
 */

function getQuestionsArray(array: Array<number>, isCorrect: boolean, lastQuestionIndex: number) : Array<number> {
    let updatedArray: Array<number> = [...array];

    if(!isCorrect) {
        updatedArray.push(lastQuestionIndex);
    } else {
        const indexToDelete: number = updatedArray.indexOf(lastQuestionIndex);
        updatedArray.splice(indexToDelete, 1);
    }

    return updatedArray;
}

export default getQuestionsArray;
