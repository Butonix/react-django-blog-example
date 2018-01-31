const initialState = {
  isChangingPassword: false,
  err: null,
  resp_message: ""
};

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case "IS_CHANGING_PASSWORD":
      return { ...state, isChangingPassword: true, err: null };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        isChangingPassword: false,
        resp_message: action.resp
      };
    case "CHANGE_PASSWORD_FAILURE":
      return {
        ...state,
        isChangingPassword: false,
        err: action.err,
        resp_message: ""
      };
    default:
      return state;
  }
}

export default changePasswordReducer;
