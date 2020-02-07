import { ACTIONS } from '../Actions/snackBarActions';

const initialState = {
  status: false,
  message: '',
  type: '',
};

const snackBarReducer = (state = initialState, action) => {
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

export default snackBarReducer;