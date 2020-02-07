import { ACTIONS } from "../Actions/loginActions";
import SecureStorage from "../Config/SecureStorage";

const initialState = {
  user: {
    username: "",
    email: "",
    age: 0
  },
  status: false,
  loading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        status: true
      };
    case ACTIONS.LOGOUT:
      SecureStorage.removeItem("token");
      window.location.href = '/';
      return {
        ...state,
        ...initialState
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
