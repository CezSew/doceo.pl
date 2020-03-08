import axios from 'axios';
import { SET_USER, USER_LOGOUT, CREATE_TEST } from '../constants/action-types';
import { getJwt } from '../helpers';

export function setUser(user) {
    return { type: SET_USER, user }
}

export function handleLogout() {
    localStorage.removeItem('jwt');
    return { type: USER_LOGOUT }
}

export function createTest(e) {
    axios.post('http://localhost:8000/api/quiz', {
        title: `test random ${Math.random() * 100}`,
        type: 'abcd',
        questions: 'TESTESTESTEST'
    },
    { headers: { Authorization: getJwt() } }
    ).then(res => {
      console.log(res);
    });
    return { type: CREATE_TEST }
}