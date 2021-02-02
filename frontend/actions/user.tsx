import {GET_USER_FINISHED_QUIZES, GET_USER_QUIZES, SET_USER, USER_LOGOUT} from "../constants/action-types";
import { requestStarted } from './index';
import { getJwt } from '../helpers';
import store from "../store";
import axios from "axios";
import { clearInputs } from "./utils";

export const handleLogin = (res, history) => {
    localStorage.setItem('jwt', res.token);
    history.goBack();

    return setUser(res.user);
}

export const requestLogin = (event, email, password, history) => {
    event.preventDefault();

    const form = event.target;
    const host = store.getState().host;

    return dispatch => {
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

export const handleLogout = () => {
    localStorage.removeItem('jwt');
    return { type: USER_LOGOUT }
}

export const setUser = user => {
    return { type: SET_USER, payload: user }
}

export const getUserQuizes = data => {
    return { type: GET_USER_QUIZES, payload: { ...data }}
}

const getUserFinishedQuizes = data => {
    return { type: GET_USER_FINISHED_QUIZES, payload: { ...data }}
}

export const requestUserQuizes = userId => {
    return dispatch => {
        const host = store.getState().host;

        dispatch(requestStarted());

        axios.post(`${host}/api/user-tests`, {
                userId: userId
            },
            { headers: { Authorization: getJwt() } }
        ).then(res => {
            dispatch(getUserQuizes(res.data));
        }).catch(e => {
            console.warn(e)
        })
    }
}

export const requestUserFinishedQuizes = userId => {
    return dispatch => {
        const host = store.getState().host;

        dispatch(requestStarted());

        axios.post(`${host}/api/user-tests-finished`, {
                userId: userId
            },
            { headers: { Authorization: getJwt() } }
        ).then(res => {
            dispatch(getUserFinishedQuizes(res.data));
        }).catch(e => {
            console.warn(e)
        })
    }
}
