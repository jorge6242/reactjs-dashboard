import {
    ACTIONS
} from '../Actions/categoryActions';

const initialState = {
    categories: [],
    loading: false
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                categories: action.payload,
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

export default categoryReducer;