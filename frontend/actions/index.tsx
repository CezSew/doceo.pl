import axios from 'axios';
import { 
    SET_USER, 
    USER_LOGOUT, 
    CREATE_TEST, 
    GET_TOP_QUIZES, 
    REQUEST_TOP_QUIZES_START 
} from '../constants/action-types';
import { getJwt } from '../helpers';

export function setUser(user) {
    return { type: SET_USER, user }
}

export function handleLogout() {
    localStorage.removeItem('jwt');
    return { type: USER_LOGOUT }
}

export function createTest(e) {
    e.preventDefault();
    const title = e.target.querySelector('.o-input[name=name]').value;
    const type = e.target.querySelector('.o-input[name=type]').value;

    if(title && type) {
        axios.post('http://localhost:8000/api/quiz', {
            title: title,
            type: type,
            questions: 'TESTESTESTEST'
        },
        { headers: { Authorization: getJwt() } }
        ).then(res => {
            console.log(res);
        });
    }
}

const getTopQuizes = data => {
    return { type: GET_TOP_QUIZES, payload: { ...data }}
}

const requestTopQuizesStarted = () => {
    return { type: REQUEST_TOP_QUIZES_START }
}

export const requestTopQuizes = () => {
    return (dispatch, getState) => {
        dispatch(requestTopQuizesStarted());

        axios.post('http://localhost:8000/api/get-top-quizes').then((res => {
            dispatch(getTopQuizes(res.data));
        }));
    }
}