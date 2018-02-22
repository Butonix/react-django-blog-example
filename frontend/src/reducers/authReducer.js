import * as types from "../types/actionTypes";

const initialState = {
  authenticated: false,
  message: ""
};

const message =
  "Please verify your email address to complete the registration process.";

function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTHENTICATED:
      return { authenticated: true, message: "" };
    case types.UNAUTHENTICATED:
      return { authenticated: false, message: "" };
    case types.VERIFY_REGISTRATION_MESSAGE:
      return { ...state, message: message };
    default:
      return state;
  }
}

export default authReducer;
