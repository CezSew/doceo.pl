import { getOccurrence } from "./getOccurence";

export const shouldGenerateNextQuestion = (array: Array<number>, lastIndex: number) : boolean => {
    return array.length > 1 && !(getOccurrence(array, array[0]) === array.length && lastIndex === array[0]);
}
