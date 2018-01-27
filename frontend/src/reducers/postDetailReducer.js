import * as types from "../types/actionTypes";

const initialState = {
	isFetching: false,
	err: null,
	snippet: {
		total_post_count: null,
		result: {}
	}
};

function postDetailReducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCHING_POST:
			return { ...state, isFetching: true, err: null };
		case types.FETCH_POST_SUCCESS:
			return {
				...state,
				isFetching: false,
				err: null,
				snippet: action.post
			};
		case types.FETCH_POST_FAILURE:
			return { ...state, isFetching: false, err: action.err };
		default:
			return state;
	}
}

export default postDetailReducer;
