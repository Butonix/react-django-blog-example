import * as types from "../types/actionTypes";

const initialState = {
	err: null,
	isFiltering: false,
	posts: []
};

function searchReducer(state = initialState, action) {
	switch (action.type) {
		case types.FILTERING_POSTS:
			return { ...state, err: null, isFiltering: true };
		case types.FILTER_POSTS_SUCCESS:
			return { ...state, isFiltering: false, posts: action.posts };
		case types.FILTER_POSTS_FAILURE:
			return { ...state, isFiltering: false, err: action.err };
		default:
			return state;
	}
}

export default searchReducer;
