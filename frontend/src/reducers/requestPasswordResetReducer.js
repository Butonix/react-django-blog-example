import * as types from "../types/actionTypes";

const initialState = {
  message: "",
  err: null
};

function requestPasswordResetReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PASSWORD_RESET_SUCCESS:
      return {
        message: action.message,
        err: null
      };
    case types.REQUEST_PASSWORD_RESET_FAILURE:
      return {
        message: "",
        err: action.err
      };
    default:
      return state;
  }
}

export default requestPasswordResetReducer;
