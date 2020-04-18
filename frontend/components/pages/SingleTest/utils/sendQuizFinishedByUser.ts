import axios from "axios";

export const sendQuizFinishedByUser = (userId, quizId) => {
    axios.post('http://localhost:8000/api/quiz_result', {
        userId: userId.toString(),
        quizId: quizId.toString()
    }).then((res => {
       console.log('sent')
    })).catch(e => {
        console.log(e);
    });
}
