import {
  combineReducers
} from 'redux';

import modalReducer from './modalReducer';
import snackBarReducer from './snackBarReducer';
import loginReducer from './loginReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  modalReducer,
  snackBarReducer,
  loginReducer,
  productReducer,
  categoryReducer,
});

export default rootReducer;