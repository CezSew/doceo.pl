import {
    SET_USER,
    USER_LOGOUT,
    GET_TOP_QUIZES,
    REQUEST_TOP_QUIZES_START, GET_USER_QUIZES
} from '../constants/action-types';
import { getHost } from './utils';

const initialState = {
    user: {},
    isUserLoggedIn: null,
    quizes_all_by_rating: [],
    userTests: [],
    host: getHost()
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
        const user = typeof action.payload.user === 'undefined'
            ? action.payload
            : action.payload.user
        if (typeof user.name === 'undefined') {
            return Object.assign({}, state, {
              user: 'null',
              isUserLoggedIn: false
            })
        } else {
            return Object.assign({}, state, {
              user: user,
              isUserLoggedIn: true
            })
        }
    case USER_LOGOUT:
      return Object.assign({}, state, {
        user: undefined,
        isUserLoggedIn: false
      })
    case GET_TOP_QUIZES:
      return Object.assign({}, state, {
        quizes_all_by_rating: action.payload,
        request_in_progress: false
      })
    case GET_USER_QUIZES:
      return Object.assign({}, state, {
          userTests: action.payload,
          request_in_progress: false
      })
    case REQUEST_TOP_QUIZES_START:
      return Object.assign({}, state, {
        request_in_progress: true
      })
    default:
      return state;
  }
}

export default rootReducer;
