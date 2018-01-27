import * as types from "../types/actionTypes";

const initialState = {
	isFetching: false,
	err: null,
	userData: {}
};

function profileReducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCHING_PROFILE_DATA:
			return { ...state, isFetching: true, err: null };
		case types.FETCH_PROFILE_DATA_SUCCESS:
			return {
				...state,
				userData: action.userData,
				isFetching: false,
				err: null
			};
		case types.FETCH_PROFILE_DATA_FAILURE:
			return { ...state, err: action.err, isFetching: false };
		default:
			return state;
	}
}

export default profileReducer;
