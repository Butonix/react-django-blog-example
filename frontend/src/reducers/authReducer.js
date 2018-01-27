import * as types from "../types/actionTypes";

function authReducer(state = {}, action) {
	switch (action.type) {
		case types.AUTHENTICATED:
			return { authenticated: true };
		case types.UNAUTHENTICATED:
			return { authenticated: false };
		default:
			return state;
	}
}

export default authReducer;
