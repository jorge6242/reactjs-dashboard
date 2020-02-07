import Category from '../Api/Category';
import snackBarUpdate from '../Actions/snackBarActions';
import { updateModal } from '../Actions/modalActions';

export const ACTIONS = {
    GET_ALL: 'category/get_all',
    GET: 'category/get',
    SET_LOADING: 'category/set_loading'
};

export const getAll = () => async dispatch => {
    try {
        const {
            data,
            status
        } = await Category.getAll();
        let getAllCategories = [];
        if (status === 200) {
            getAllCategories = data;
            dispatch({
                type: ACTIONS.GET_ALL,
                payload: getAllCategories
            });
        }
        return getAllCategories;
    } catch (error) {
        snackBarUpdate({
            payload: {
                message: error.message,
                status: true,
                type: 'error',
            },
        })(dispatch);
        return error;
    }
};

export const create = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Category.create(body);
        let createProductResponse = [];
        if (status === 200 || status === 201) {
            createProductResponse = {
                data,
                status
            };
            snackBarUpdate({
                payload: {
                    message: 'Category Created!',
                    type: 'success',
                    status: true,
                },
            })(dispatch);
            dispatch(getAll())
            dispatch(updateModal({
                payload: {
                    status: false,
                    element: null
                }
            }))
        }
        return createProductResponse;
    } catch (error) {
        snackBarUpdate({
            payload: {
                message: error.message,
                type: 'error',
                status: true,
            },
        })(dispatch);
        return error;
    }
};

export const get = id => async dispatch => {
    try {
        const {
            data,
            status
        } = await Category.get(id);
        let categoryResponse = [];
        if (status === 200) {
            categoryResponse = data;
        }
        return categoryResponse;
    } catch (error) {
        snackBarUpdate({
            payload: {
                message: error.message,
                type: 'error',
                status: true,
            },
        })(dispatch);
        return error;
    }
};

export const update = body => async dispatch => {
    dispatch({
        type: ACTIONS.SET_LOADING,
        payload: true
    });
    try {
        const {
            data,
            status
        } = await Category.update(body);
        let categoryResponse = [];
        if (status === 200) {
            categoryResponse = {
                data,
                status
            };
            snackBarUpdate({
                payload: {
                    message: 'Category Updated!',
                    type: 'success',
                    status: true,
                },
            })(dispatch);
            dispatch(getAll())
            dispatch({
                type: ACTIONS.SET_LOADING,
                payload: false
            });
        }
        return categoryResponse;
    } catch (error) {
        snackBarUpdate({
            payload: {
                message: error.message,
                type: 'error',
                status: true,
            },
        })(dispatch);
        dispatch({
            type: ACTIONS.SET_LOADING,
            payload: false
        });
        return error;
    }
};

export const remove = id => async dispatch => {
    try {
        const {
            data,
            status
        } = await Category.remove(id);
        let categoryResponse = [];
        if (status === 200) {
            categoryResponse = {
                data,
                status
            };
            snackBarUpdate({
                payload: {
                    message: 'Category Removed!',
                    type: 'success',
                    status: true,
                },
            })(dispatch);
            dispatch(getAll())
        }
        return categoryResponse;
    } catch (error) {
        snackBarUpdate({
            payload: {
                message: error.message,
                type: 'error',
                status: true,
            },
        })(dispatch);
        return error;
    }
};