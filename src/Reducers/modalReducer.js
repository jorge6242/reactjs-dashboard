import { ACTIONS } from '../Actions/modalActions';

const initialState = {
  status: false,
  element: null,
  isLoader: false,
  customSize: '',
  title: '',
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.STATUS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;