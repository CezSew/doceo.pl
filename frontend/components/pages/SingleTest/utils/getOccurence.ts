/**
 * returns a count of item appearances in input array
 * @param array {Array}
 * @param value {string|number}
 * @returns {number} count of apperances
 */

export function getOccurrence(array: Array<any>, value: string|number): number {
    let count = 0;

    array.forEach((v) => (v === value && count++));

    return count;
}
