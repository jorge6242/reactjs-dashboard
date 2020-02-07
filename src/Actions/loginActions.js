import Auth from '../Api/Auth';
import SecureStorage from '../Config/SecureStorage'
import snackBarUpdate from '../Actions/snackBarActions';

export const ACTIONS = {
    LOGIN: 'login/login',
    SET_USER: 'login/set_user',
    LOGOUT: 'login/logout',
    SET_LOADING: 'login/set_loading',
};

export const login = body => async dispatch => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
        const {
            data,
            status
        } = await Auth.login(body);
        let authResponse = [];
        if (status === 200 || status === 201) {
            authResponse = {
                data,
                status
            };
            const { access_token: { token }, user } = data;
            SecureStorage.setItem('token', token);
            dispatch({ type: ACTIONS.SET_USER, payload: user })
            dispatch({ type: ACTIONS.SET_LOADING, payload: false })
        }
        return authResponse;
    } catch (error) {
        let title = ''
        if (error.response) {
            const { status, data: { message } } = error.response
            if (status === 401) {
                title = message
            }
        }
        snackBarUpdate({
            payload: {
                message: title,
                status: true,
                type: 'error',
            },
        })(dispatch);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
        return error;
    }
};

export const logout = () => ({ type: ACTIONS.LOGOUT })

export const checkUser = () => async dispatch => {
    try {
        const {
            data,
            status
        } = await Auth.checkLogin();
        let checkUserLoginResponse = [];
        if (status === 200) {
            checkUserLoginResponse = data;
            dispatch({ type: ACTIONS.SET_USER, payload: data })
        }
        return checkUserLoginResponse;
    } catch (error) {
        return error;
    }
};
