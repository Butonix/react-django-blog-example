import * as types from "../types/actionTypes";

const initialState = {
  err: null,
  isSubmitting: false,
  message: null
};

let msg = "Thank you for submitting the form, I will contact you shortly.";

function contactFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.SUBMITTING_CONTACT_FORM:
      return { ...state, isSubmitting: true, err: null, message: null };
    case types.SUBMIT_CONTACT_FORM_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        err: null,
        message: msg
      };
    case types.SUBMIT_CONTACT_FORM_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        err: action.err,
        message: null
      };
    default:
      return state;
  }
}

export default contactFormReducer;
