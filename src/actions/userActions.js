import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_REQUEST } from './types';
import { loginService, logoutService } from '../services/index';

import { createHashHistory } from 'history';
const history = createHashHistory();

export const loginUser = (user) => dispatch => {
    loginService(user).then(
        user => {
            // console.log('loginService:.user', user);
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: user.data
            })
            history.push('/home');
        },
        error => {
            alert(error);
            dispatch({
                type: LOGIN_USER_FAIL,
                // payload: user
            })
        }
    );   
};

export const logoutUser = () => dispatch => {
    return logoutService().then(() => {
        dispatch({ type: LOGOUT_REQUEST, payload: {} });
        history.push('/');
        window.location.reload();
    });
};
