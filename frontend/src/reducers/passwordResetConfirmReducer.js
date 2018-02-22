import * as types from "../types/actionTypes";

const initialState = {
  message: {
    detail: ""
  },
  err: null
};

function passwordResetConfirmReducer(state = initialState, action) {
  switch (action.type) {
    case types.PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        message: action.message,
        err: null
      };
    case types.PASSWORD_RESET_CONFIRM_FAILURE:
      return {
        message: {},
        err: action.err
      };
    default:
      return state;
  }
}

export default passwordResetConfirmReducer;
