import axios from "axios";
import store from '../../../../store';

export const sendQuizFinishedByUser = (userId, quizId) => {
    const host = store.getState().host;

    axios.post(`${host}/api/quiz_result`, {
        userId: userId.toString(),
        quizId: quizId.toString()
    }).then((res => {
       console.log('sent')
    })).catch(e => {
        console.log(e);
    });
}
