import {
    ACTIONS
} from '../Actions/productActions';

const initialState = {
    products: [],
    loading: false
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                products: action.payload,
            };
            case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;