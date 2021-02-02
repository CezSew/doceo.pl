import { GET_TOP_QUIZES } from "../constants/action-types";
import store from "../store";
import axios from "axios";
import { getJwt } from '../helpers';
import { getUserQuizes } from "./user";
import { requestStarted } from "./index";

const getTopQuizes = data => {
    return { type: GET_TOP_QUIZES, payload: { ...data }}
}

export const requestTopQuizes = (page = 1) => {
    const user = store.getState().user;
    let activeUserId = 'none';

    if(user && user.hasOwnProperty('id')) activeUserId = user.id.toString();

    return (dispatch, getState) => {
        const host = store.getState().host;
        dispatch(requestStarted());

        axios.post(`${host}/api/get-quizes?page=${page}`,{
            perPage: 5,
            filter: "rating",
            userId: activeUserId
        }).then((res => {
            dispatch(getTopQuizes(res.data));
        }));
    }
}

export const requestDeleteQuiz = (testId) => {
    return dispatch => {
        const host = store.getState().host;

        dispatch(requestStarted());

        axios.delete(`${host}/api/delete-test`, {
            headers: {
                Authorization: getJwt()
            },
            data: {
                testId: testId
            }
        }).then(res => {
            dispatch(getUserQuizes(res.data));
        }).catch(e => {
            console.warn(e)
        })
    }
}
