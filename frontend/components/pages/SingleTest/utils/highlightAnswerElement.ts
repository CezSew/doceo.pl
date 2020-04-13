const highlightAnswerElement = (target, isCorrect) => {
    let className;

    if(isCorrect) {
        className = 'correct';
    } else {
        className = 'incorrect';
    }

    target.className += ' ' + className;
}

export default highlightAnswerElement;
