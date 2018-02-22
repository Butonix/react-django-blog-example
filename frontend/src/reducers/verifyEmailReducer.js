import * as types from "../types/actionTypes";

const initialState = {
  message: "",
  err: null
};

function verifyEmailReducer(state = initialState, action) {
  switch (action.type) {
    case types.VERIFY_REGISTRATION_EMAIL_SUCCESS:
      return {
        message: action.message,
        err: null
      };
    case types.VERIFY_REGISTRATION_EMAIL_FAILURE:
      return {
        message: "",
        err: action.err
      };
    default:
      return state;
  }
}

export default verifyEmailReducer;
