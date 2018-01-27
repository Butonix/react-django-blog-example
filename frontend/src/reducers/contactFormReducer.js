import * as types from "../types/actionTypes";

const initialState = {
	err: null,
	isSubmitting: false,
	captcha: "",
	message: null
};

let msg = "Thank you for submitting the form, I will contact you shortly.";

function contactFormReducer(state = initialState, action) {
	switch (action.type) {
		case types.SUBMITTING_CONTACT_FORM:
			return { ...state, isSubmitting: true, err: null };
		case types.SUBMIT_CONTACT_FORM_SUCCESS:
			return {
				...state,
				isSubmitting: false,
				err: null,
				message: msg,
				captcha: ""
			};
		case types.SUBMIT_CONTACT_FORM_FAILURE:
			return {
				...state,
				isSubmitting: false,
				err: action.err,
				captcha: "",
				message: null
			};
		case types.STORE_CAPTCHA:
			return {
				...state,
				captcha: action.val,
				err: null
			};
		default:
			return state;
	}
}

export default contactFormReducer;
