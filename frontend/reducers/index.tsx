import {
  SET_USER, 
  USER_LOGOUT, 
  GET_TOP_QUIZES, 
  REQUEST_TOP_QUIZES_START
} from '../constants/action-types';

const initialState = {
  user: {},
  isUserLoggedIn: null,
  quizes_all_by_rating: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      if (typeof action.payload.user === 'undefined') {
        return Object.assign({}, state, {
          user: action.payload.user,
          isUserLoggedIn: false
        })
      } else {
        return Object.assign({}, state, {
          user: action.payload.user,
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
    case REQUEST_TOP_QUIZES_START:
      return Object.assign({}, state, {
        request_in_progress: true
      })
    default:
      return state;
  }
}

export default rootReducer;