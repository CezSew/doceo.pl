import { getOccurrence } from "./getOccurence";

export const shouldGenerateNextQuestion = (array: Array<number>, lastIndex: number) : boolean => {
    return array.length > 1 && !(getOccurrence(array, array[0]) === array.length && lastIndex === array[0]);
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
