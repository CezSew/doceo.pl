/**
 * Should generate next question
 *
 * generate next question, IF
 * length of probability array is 1 or higher
 */
export const shouldGenerateNextQuestion = (array: Array<number>, lastIndex: number) : boolean => {
    return array.length >= 1;
}

export const isQuestionEliminated = (lastQuestionIndex: number, arrayOfIndexes: Array<number|string>) => {
    let result = false;
    const position = arrayOfIndexes.indexOf(lastQuestionIndex);

    if(position === -1) {
        result = true;
    }

    return result;
}

export const getAnwerAccuracyPercent = (correct: number, given: number): number => {
    if(given) {
        return Math.floor(correct / given * 100);
    } else {
        return 0;
    }
}
