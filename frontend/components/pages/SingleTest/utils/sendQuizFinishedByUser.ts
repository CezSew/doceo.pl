import axios from "axios";
import store from '../../../../store';
import { getJwt } from '../../../../helpers';

export const sendQuizFinishedByUser = (userId, quizId, score) => {
    const host = store.getState().host;

    axios.post(`${host}/api/set-user-score`, {
        userId: userId.toString(),
        quizId: quizId.toString(),
        score: score.toString()
    }, { headers: { Authorization: getJwt() }}).catch(e => {
        console.log(e);
    });
}
