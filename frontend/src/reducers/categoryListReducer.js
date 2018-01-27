import * as types from "../types/actionTypes";

const initialState = {
	isFetching: false,
	err: null,
	posts: []
};

function categoryListReducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCHING_POSTS_FOR_CATEGORY:
			return { ...state, isFetching: true, err: null };
		case types.FETCH_POSTS_FOR_CATEGORY_SUCCESS:
			return {
				...state,
				isFetching: false,
				posts: action.posts,
				err: null
			};
		case types.FETCH_POSTS_FOR_CATEGORY_FAILURE:
			return { ...state, isFetching: false, err: action.err };
		default:
			return state;
	}
}

export default categoryListReducer;
