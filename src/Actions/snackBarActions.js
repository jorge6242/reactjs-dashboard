export const ACTIONS = {
    STATUS: 'snackBar/status',
  };

  export default function snackBarUpdate(value) {
    return dispatch => {
      dispatch({ type: ACTIONS.STATUS, ...value });
    };
  }