export const decodeQuestions = (string): Object => {
    const questions = JSON.parse(decodeURIComponent(string));

    return questions;
}
