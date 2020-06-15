import axios from 'axios';
import { clearInputs } from './utils';
import store from '../store';
import { getJwt } from '../helpers';
import {
    SET_USER,
    USER_LOGOUT,
    CREATE_TEST,
    GET_TOP_QUIZES,
    REQUEST_TOP_QUIZES_START,
    HANDLE_LOGIN,
    GET_USER_QUIZES
} from '../constants/action-types';


export function requestLogin(event, email, password, history) {
    event.preventDefault();
    const form = event.target;
    const host = store.getState().host;

    return (dispatch) => {
        axios.post(`${host}/api/login`, {
            email: email,
            password: password
        }).then(res => {
            dispatch(handleLogin(res.data, history));
        }).catch(e => {
            clearInputs(form);
            alert('Błędne dane logowania, spróbuj ponownie.')
        });
    }
}

function handleLogin(res, history) {
    localStorage.setItem('jwt', res.token);
    history.goBack();

    return setUser(res.user);
}

export function handleLogout() {
    localStorage.removeItem('jwt');
    return { type: USER_LOGOUT }
}

function setUser(user) {
    return { type: SET_USER, payload: user }
}

const getTopQuizes = data => {
    return { type: GET_TOP_QUIZES, payload: { ...data }}
}

const getUserQuizes = data => {
    return { type: GET_USER_QUIZES, payload: { ...data }}
}

const requestStarted = () => {
    return { type: REQUEST_TOP_QUIZES_START }
}

export const requestTopQuizes = () => {
    return (dispatch, getState) => {
        const host = store.getState().host;
        dispatch(requestStarted());
        axios.post(`${host}/api/get-top-quizes`).then((res => {
            dispatch(getTopQuizes(res.data));
        }));
    }
}

export const requestUserQuizes = (userId) => {
    return (dispatch, getState) => {
        const host = store.getState().host;
        dispatch(requestStarted());
        axios.post(`${host}/api/user-tests`, {
                userId: userId
            },
            { headers: { Authorization: getJwt() } }
        ).then(res => {
            dispatch(getUserQuizes(res.data));
        }).catch(e => {
            console.log(e)
        })
    }
}

export const requestDeleteQuiz = (testId) => {
    return (dispatch, getState) => {
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
            console.log(e)
        })
    }
}
