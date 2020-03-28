export const testNameLetters = (name) => {
    const splitName = name.split(' ');

    const firstLetter = getFirstLetterFromArrayPosition(splitName, 0);
    const secondLetter = getFirstLetterFromArrayPosition(splitName, 1);

    return firstLetter + secondLetter;
} 

const getFirstLetterFromArrayPosition = (array, pos) => {
    return array[pos] 
    ? array[pos][0] 
    : '';
}