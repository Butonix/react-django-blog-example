import * as types from "../types/actionTypes";

const initialState = {
  err: null,
  isAuthenticated: false,
  isAuthenticating: false,
  token_data: {}
};

function googleInfoReducer(state = initialState, action) {
  switch (action.type) {
    case types.GOOG_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: true,
        err: null,
        isAuthenticated: false,
        token_data: {}
      };
    case types.CONVERT_GOOG_TOKEN_SUCCESS:
      return {
        ...state,
        err: null,
        isAuthenticated: true,
        isAuthenticating: false,
        token_data: action.goog_token
      };
    case types.CONVERT_GOOG_TOKEN_FAILURE:
      return {
        ...state,
        err: action.err,
        isAuthenticated: false,
        isAuthenticating: false
      };
    case types.GOOGLE_LOGOUT:
      return {
        ...initialState
      };
    case "GOOG_AUTHENTICATE_ACTION":
      return {
        ...state,
        isAuthenticated: true
      };
    default:
      return state;
  }
}

export default googleInfoReducer;
