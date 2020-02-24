import { LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS, LOGIN_USER_FAIL, REGISTER_USER_FAIL, LOGOUT_REQUEST } from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = !user
  ? {
    loggingIn: false,
    loggedIn: false,
    user: {}
  }
  : {
    loggingIn: false,
    loggedIn: !!user,
    user: user || {}
  };

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.payload
      };
      case LOGOUT_REQUEST:
      return {
        loggingIn: false,
        loggedIn: false,
        user: {}
      };
    case REGISTER_USER_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.payload
      };
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {};
    default:
      return state;
  }
}
