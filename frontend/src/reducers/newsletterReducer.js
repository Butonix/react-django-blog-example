import * as types from "../types/actionTypes";

const initialState = {
	isSubscribing: false,
	err: null,
	message: ""
};

let msg = "Subscribed successfully!";

function newsletterReducer(state = initialState, action) {
	switch (action.type) {
		case types.IS_SUBSCRIBING:
			return { ...state, err: null, message: "", isSubscribing: true };
		case types.SUBSCRIBE_SUCCESS:
			return { ...state, err: null, message: msg, isSubscribing: false };
		case types.SUBSCRIBE_FAILURE:
			return { ...state, err: action.err, isSubscribing: false };
		default:
			return state;
	}
}

export default newsletterReducer;
