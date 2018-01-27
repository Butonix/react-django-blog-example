import * as types from "../types/actionTypes";

const initialState = {
	isFetching: false,
	err: null,
	posts: []
};

function postArchiveReducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCHING_POSTS_FOR_ARCHIVE:
			return { ...state, isFetching: true, err: null };
		case types.FETCH_POSTS_FOR_ARCHIVE_SUCCESS:
			return {
				...state,
				isFetching: false,
				posts: action.posts,
				err: null
			};
		case types.FETCH_POSTS_FOR_ARCHIVE_FAILURE:
			return { ...state, isFetching: false, err: action.err };
		default:
			return state;
	}
}

export default postArchiveReducer;
