import Product from '../Api/Product';
import snackBarUpdate from '../Actions/snackBarActions';
import { updateModal } from '../Actions/modalActions';

export const ACTIONS = {
    GET_ALL: 'product/get_all',
    GET: 'product/get',
    SET_LOADING: 'product/set_loading'
};

export const getAll = () => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.getAll();
        let getAllProducts = [];
        if (status === 200) {
            getAllProducts = data;
            dispatch({
                type: ACTIONS.GET_ALL,
                payload: getAllProducts
            });
        }
        return getAllProducts;
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
    dispatch({
        type: ACTIONS.SET_LOADING,
        payload: true
    });
    try {
        const {
            data,
            status
        } = await Product.create(body);
        let createProductResponse = [];
        if (status === 200 || status === 201) {
            createProductResponse = {
                data,
                status
            };
            snackBarUpdate({
                payload: {
                    message: 'Product Created!',
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
            dispatch({
                type: ACTIONS.SET_LOADING,
                payload: false
            });
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
        dispatch({
            type: ACTIONS.SET_LOADING,
            payload: false
        });
        return error;
    }
};

export const get = id => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.get(id);
        let productResponse = [];
        if (status === 200) {
            productResponse = data;
        }
        return productResponse;
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
        } = await Product.update(body);
        let productResponse = [];
        if (status === 200) {
            productResponse = {
                data,
                status
            };
            snackBarUpdate({
                payload: {
                    message: 'Product Updated!',
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
        return productResponse;
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
        } = await Product.remove(id);
        let productResponse = [];
        if (status === 200) {
            productResponse = {
                data,
                status
            };
            snackBarUpdate({
                payload: {
                    message: 'Product Removed!',
                    type: 'success',
                    status: true,
                },
            })(dispatch);
            dispatch(getAll())
        }
        return productResponse;
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